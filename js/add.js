const body = document.body;
let currentAcademicYear = 1; // The numbers of years of school currently being listed.

/**
 * This appends a new year divider and year element to the body.
 * The html being created is as follows:
 * 
 * <div id="year-divider-#" class="year-divider"></div>
 * <div id="year-#">
 *     <div id="fall-# class="semester" ondrop="dropHandler(event)" ondragover="dragoverHandler(event)"></div>
 *     <div id="spring-#" class="semester" ondrop="dropHandler(event)" ondragover="dragoverHandler(event)"></div>
 *     <div id="summer-#" class="semester" ondrop="dropHandler(event)" ondragover="dragoverHandler(event)"></div>
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
        semesterDiv.ondrop = dropHandler;
        semesterDiv.ondragover = dragoverHandler;
        yearDiv.appendChild(semesterDiv);
    });
    body.appendChild(yearDiv);
}

/**
 * This removes a year divider and year element from the body.
 */
function removeYear() {
    console.log(`Remove Year ${currentAcademicYear}`);
    document.getElementById(`year-divider-${currentAcademicYear}`).remove();
    document.getElementById(`year-${currentAcademicYear}`).remove();
    currentAcademicYear--;
}
