document.addEventListener('DOMContentLoaded', function() {
    refreshCourses(); // Refresh <table> when Page loaded
    var currentEditingCourseId = null; // Make sure to edit only one course

    // [Path 1 - Get] -- Get all Courses - 'http://localhost:5000/courses/get'
    function refreshCourses() {
        axios.get('http://localhost:5000/courses/get')
        .then(response => {
            const courseList = document.getElementById('courseList');
            courseList.innerHTML = ''; // Clear Course Table
            
            response.data.forEach(currentCourse => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${currentCourse._id.toString()}</td> 
                    <td>${currentCourse.courseID}</td>
                    <td>${currentCourse.courseName}</td>
                    <td>${currentCourse.courseDay}</td>
                    <td>${currentCourse.sessionLength}</td>
                    <td>${currentCourse.price}</td> 
                    <td>${currentCourse.memberNumber}</td> 
                    <td>
                        <a href="#" onclick="editCourse('${currentCourse._id.toString()}')">edit</a> / 
                        <a href="#" onclick="deleteCourse('${currentCourse._id.toString()}')">delete</a>
                    </td>
                `;
                courseList.appendChild(tr);
            });
        })
        .catch(error => console.error(error.message));
    }

    // [Path 2 - POST] -- Create a Course - 'http://localhost:5000/courses/create'
    document.getElementById('createCourseButton').addEventListener('click', (event) => {
        event.preventDefault(); 

        // Populate `course` Object with the content of <form>
        let courseForm = document.getElementById('courseForm');
        var formData = new FormData(courseForm);
        var course = {};
        formData.forEach((value, name) => course[name] = value);

        axios.post('http://localhost:5000/courses/create', course)
        .then(() => {
            refreshCourses(); // Refresh <table> after CREATE
            console.log(`Course created: `, course);
            courseForm.reset(); // Clear the form
        })
        .catch(error => console.error(error.message));
    });      


    // [Path 3 - GET] -- Get a Course - 'http://localhost:5000/courses/get/:courseId'
    window.editCourse = function(courseId) {             
        currentEditingCourseId = courseId;  // Change current Editing CourseId  

        axios.get(`http://localhost:5000/courses/get/${courseId}`)
        .then(response => {
            console.log("Get this Course", response.data); 
            let courseData = {...response.data}; // light copy, avoid changing the original data
            delete courseData._id; 
            delete courseData.__v; 
        
            // Fill the <form> with fetched Course
            let courseForm = document.getElementById('courseForm');
            Object.keys(courseData).forEach(key => {
                courseForm.elements[key].value = courseData[key];                         
            });
        
            // Enable edit <button>, disable create <button>
            document.getElementById('editCourseButton').disabled = false;
            document.getElementById('createCourseButton').disabled = true;
        })
        .catch(error => console.error(error.message));      
    };


    // [Path 4 - PUT] -- Update a Course - 'http://localhost:5000/courses/update/:courseId'
    document.getElementById('editCourseButton').addEventListener('click',  (event) => {
        event.preventDefault();    

        // Populate `course` Object with the content of <form>
        let courseForm = document.getElementById('courseForm');
        var formData = new FormData(courseForm);
        var course = {};
        formData.forEach((value, name) => course[name] = value);

        axios.put(`http://localhost:5000/courses/update/${currentEditingCourseId}`, course)
        .then((response) => {
            refreshCourses(); // Refresh <table> after UPDATE
            console.log(`Course: ${currentEditingCourseId} updated`, response.data);
            courseForm.reset(); // Clear the form
    
            // Disable edit <button>, enable create <button>
            document.getElementById('editCourseButton').disabled = true;
            document.getElementById('createCourseButton').disabled = false;
        })
        .catch(error => console.error(error.message));     
    });

    // [Path 5 -- DELETE] -- Delete a Course - 'http://localhost:5000/courses/delete/:modulId'
    window.deleteCourse = function(courseId) {             
        axios.delete(`http://localhost:5000/courses/delete/${courseId}`)
        .then(() => {
            console.log(`Course: ${courseId} deleted successfully`);
            refreshCourses(); // Refresh the list after deleting
        })
        .catch(error => console.error(error.message));
    };

    // [Path 6 -- Create] -- Generate Random Course - 'http://localhost:5000/courses/generate-course'
    document.getElementById('generateRandomCourse').addEventListener('click', (event) => {  
        event.preventDefault(); 

        axios.get(`http://localhost:5000/courses/generate-course`)
        .then(response => {
            let courseData = response.data; 
            console.log("Generate a Course", response.data); 

            // Fill the <form> with fetched Course
            let courseForm = document.getElementById('courseForm');
            Object.keys(courseData).forEach(key => {
                courseForm.elements[key].value = courseData[key];                       
            });

        })
        .catch(error => console.error(error.message));  
    });

}); // End of Load Page