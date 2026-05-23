course_types = [
    "set_course",   // A predefined course in the RIT system
    "open_course"   // A selectable course to fulfil a requirement
]

// I added the "General Education: Immersion", "Lab Science: Lab", and "Lab Science: Lecture" attributes
// No attributes is an open elective

const body = document.body;
let currentAcademicYear = 1; // The numbers of years of school currently being listed.
const years = ["First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth", 
        "Ninth", "Tenth", "Eleventh", "Twelfth", "Thirteenth", "Fourteenth", "Fifteenth"];
const semesters = ["Fall", "Spring", "Summer"];


/*const fall_1 = document.getElementById(`fall-${currentAcademicYear}`);
const spring_1 = document.getElementById(`spring-${currentAcademicYear}`);
const summer_1 = document.getElementById(`summer-${currentAcademicYear}`);
makeSortable(fall_1);
makeSortable(spring_1);
makeSortable(summer_1);*/

/**
 * This makes the given div element sortable.
 * 
 * @param {*} element - the given semester div
 */
function makeSortable(element) {
    Sortable.create(element, {
        group: "semester",
        animation: 200,
        // Makes sure a class and co-op can't be added to the same semester
        onMove: function (event, originalEvent) {
            const movingElement = event.dragged;
            const targetElement = event.to;
            const targetChildren = targetElement.children;
            if (targetChildren.length > 0) {
                // Note: Works because both "class" and "co-op" are length 5
                let movingClass = movingElement.className.slice(0, 5);
                let targetClass = targetChildren[0].className.slice(0, 5);
                return movingClass == targetClass;
            }
        }
    });
}

async function uploadTemplate() {
    const template  = (await import("/json/cs_bsms_2526_template.json", { with: { type: "json" } })).default;
    console.log(template);
    template.forEach((yearInfo, index) => createYear(yearInfo, index + 1));
}

function createYear(yearInfo, academicYearCount) {
    console.log(yearInfo, academicYearCount);

    if (academicYearCount != 1) {
        const yearDividerDiv = document.createElement("div");
        yearDividerDiv.id = `year-divider-${academicYearCount}`
        yearDividerDiv.className = "year-divider";
        body.appendChild(yearDividerDiv);
    }

    const yearDiv = document.createElement("div");
    yearDiv.id = `year-${academicYearCount}`;
    yearDiv.className = "year";

    const yearTextDiv = document.createElement("div");
    yearTextDiv.id = `year-text-${academicYearCount}`
    yearTextDiv.className = "year-text";
    yearTextDiv.textContent = `${years[academicYearCount - 1]} Year` || "";
    yearDiv.appendChild(yearTextDiv);

    const yearBlockDiv = document.createElement("div");
    yearBlockDiv.id = `year-block-${academicYearCount}`
    yearBlockDiv.className = "year-block";
    yearDiv.appendChild(yearBlockDiv);

    yearInfo.forEach((semesterInfo, index) => {
        const semesterDiv = createSemester(semesterInfo, academicYearCount, semesters[index])
        yearBlockDiv.appendChild(semesterDiv);
    });
    body.appendChild(yearDiv);
}

function createSemester(semesterInfo, academicYearCount, term) {
    console.log(semesterInfo);
    const semesterDiv = document.createElement("div");
    semesterDiv.id = `${term}-${academicYearCount}`;
    semesterDiv.className = "semester";
    makeSortable(semesterDiv);

    semesterInfo.forEach(courseInfo => {
        const courseDiv = createCourse(courseInfo);
        semesterDiv.appendChild(courseDiv);
    });
    return semesterDiv;
}

function createCourse(courseInfo) {
    console.log(courseInfo);
    const courseDiv = document.createElement("div");
    // courseDiv.id = `c10`
    if (courseInfo["co-op"]) {
        courseDiv.className = "co-op";
        courseDiv.textContent = `${courseInfo.name} (${courseInfo.discipline}-${courseInfo.number})`
    } else if (courseInfo.set_course) {
        courseDiv.className = "class";
        courseDiv.textContent = `${courseInfo.discipline}-${courseInfo.number}\n\n${courseInfo.name}`
        switch (courseInfo.discipline) {
            case "CSCI":
            case "SWEN":
                courseDiv.style.borderColor = "Orange";
                break;
            case "MATH":
                courseDiv.style.borderColor = "Blue";
                break;
            case "YOPS":
                courseDiv.style.borderColor = "OrangeRed";
                break;
        }
    } else {
        courseDiv.className = "class";
        courseDiv.textContent = `${courseInfo.attribute}\n\n________`
        const attribute = courseInfo.attribute;
        if (attribute == null || attribute == "") {
            courseDiv.textContent = `Open Elective`
            courseDiv.style.borderColor = "Purple";
        } else if (attribute.startsWith("Activity Course")) {
            courseDiv.style.borderColor = "Yellow";
        } else if (attribute.startsWith("CS")) {
            courseDiv.style.borderColor = "Orange";
        } else if (attribute.startsWith("Gen")) {
            courseDiv.style.borderColor = "Green";
        } else if (attribute.startsWith("Lab Science")) {
            courseDiv.style.borderColor = "Red";
        } else if (attribute.startsWith("Writing Intensive")) {
            courseDiv.style.borderColor = "Green";
        }
    }
    return courseDiv;
}

function downloadTemplate() {

}

/**
 * This appends a new year divider and year element to the body.
 * The html being created is as follows:
 * 
 * <div id="year-divider-#" class="year-divider"></div>
 * <div id="year-#">
 *     <div id="fall-# class="semester"></div>
 *     <div id="spring-#" class="semester"></div>
 *     <div id="summer-#" class="semester"></div>
 * </div>
 */
function addYear() {
    currentAcademicYear++;
    console.log(`Add Year ${currentAcademicYear}`);

    const yearDividerDiv = document.createElement("div");
    yearDividerDiv.id = `year-divider-${currentAcademicYear}`
    yearDividerDiv.className = "year-divider";
    body.appendChild(yearDividerDiv);

    const yearDiv = document.createElement("div");
    yearDiv.id = `year-${currentAcademicYear}`
    const semesters = ["fall", "spring", "summer"];
    semesters.forEach(term => {
        const semesterDiv = document.createElement("div");
        semesterDiv.id = `${term}-${currentAcademicYear}`;
        semesterDiv.className = "semester";
        makeSortable(semesterDiv);
        yearDiv.appendChild(semesterDiv);
    });
    body.appendChild(yearDiv);
}

/**
 * This removes a year divider and year element from the body.
 */
async function removeYear() {
    if (currentAcademicYear == 1) return;
    console.log(`Remove Year ${currentAcademicYear}`);
    document.getElementById(`year-divider-${currentAcademicYear}`).remove();
    document.getElementById(`year-${currentAcademicYear}`).remove();
    currentAcademicYear--;
}

async function addClass() {
    console.log("addClass()");
    const module  = await import("/json/class.json", { with: { type: "json" } });
    console.log(module);
    const classDiv = document.createElement("div");
    classDiv.id = `c10`
    classDiv.className = "class";
    classDiv.textContent = "NEW CLASS";
    const latest_semester = document.getElementById(`summer-${currentAcademicYear}`);
    latest_semester.appendChild(classDiv);
}
