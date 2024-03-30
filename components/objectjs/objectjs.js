const addStdSecId = 'popUpAddStd'
const tblResult = 'showResult'
const avgTitle = 'Điểm trung bình'
const maxTitle = 'Điểm lớn nhất'
const minTitle = 'Điểm nhỏ nhất'
const showAllStd = 'showStdBtn'

// Toast Msg
const toastMsgId = 'toastMsg'
const toastIconClass = 'toast-icon'
const toastBodyClass = 'toast-body'
const toastTitleClass = 'toast-title'
const toastContentClass = 'toast-content'
const toastMsgSameClass = 'toast-msg'
const successClass = 'toast-success'
const warningClass = 'toast-warning'
const errorClass = 'toast-error'
const successMsg = 'Success'
const warningMsg = 'Warning'
const errorMsg = 'Error'
const fontAwesomePrefix = 'fa-solid'
const successIconSuffixes = 'fa-circle-check'
const warningIconSuffixes = 'fa-circle-exclamation'
const errorIconSuffixes = 'fa-triangle-exclamation'
const toastMsgOffTime = 3000

// End Toast Msg

const warningNameField =
    'Mời bạn nhập họ & tên (Không chứa kí tự đặc biệt hoặc số)'
const warningDateField = 'Mời bạn chọn ngày tháng năm sinh của mình'
const warningIdField = 'Mời nhập lại mã sinh viên (mã ngành: HV, STT: 0001)'
const warningScoreOneField = 'Mời bạn nhập lại điểm môn thứ 1'
const warningScoreOTwoField = 'Mời bạn nhập lại điểm môn thứ 2'
const warningScoreThreeField = 'Mời bạn nhập lại điểm môn thứ 3'
const msgConfirm = 'Bạn có chắc chắn muốn xóa học sinh này?'
const msgNoData = `We're sorry. We were not able to find a match.`

const titleName = 'Họ tên'
const titleDOB = 'Ngày sinh'
const titleStdID = 'Mã số sinh viên'
const titleScrOne = 'Điểm môn thi số 1'
const titleScrTwo = 'Điểm môn thi số 2'
const titleScrThree = 'Điểm môn thi số 3'
const titleAverage = 'Điểm trung bình'
const titleEdit = 'Thao tác'

const prefixIcoSomeware = 'fa-solid'
const icoDownArrow = 'fa-arrow-down-wide-short'
const icoUpArrow = 'fa-arrow-up-short-wide'
const icoSort = 'fa-sort'

const tblResultType = {
    all: 1,
    search: 2,
}
const sortNameEnum = {
    icoSortName: 'Name',
    icoSortAge: 'Age',
    icoSortStdId: 'StdsId',
    icoSortScrOne: 'Score',
    icoScrTwo: 'ScrTwo',
    icoSortScrThree: 'ScrThree',
    icoSortScrAvg: 'ScrAvg',
}

const typeOfToast = {
    success: 1,
    warning: 2,
    error: 3,
}

let listStudent

function showAddStdSec() {
    showHideSecById(addStdSecId, false)
    hidePopUpByOvl(false)
}

function showPopup() {
    document.getElementById('overlay').style.display = 'block'
    document.getElementById('secEditStd').style.display = 'table'
}

function hidePopup() {
    document.getElementById('overlay').style.display = 'none'
    document.getElementById('secEditStd').style.display = 'none'
}

function validateName(nameInput) {
    let isCheck = /^[a-zA-ZÀ-ỹ\s]+$/.test(nameInput)

    if (nameInput.trim() === '' || !isCheck) {
        alert(warningNameField)
        return false
    }
    return true
}

function validateDate(dateInput) {
    if (dateInput.trim() == '') {
        alert(warningDateField)
        return false
    }

    return true
}

function validateId(idInput) {
    let inputLength = idInput.length

    if (
        idInput.trim() == '' ||
        inputLength < 6 ||
        idInput.substr(0, 2) !== 'HV' ||
        isNaN(idInput.substr(2, inputLength))
    ) {
        alert(warningIdField)
        return false
    }

    return true
}

function validateScore(scoreInput, warningMsg) {
    if (scoreInput < 0 || scoreInput.trim() == '' || isNaN(scoreInput)) {
        alert(warningMsg)
        return false
    } else {
        return true
    }
}

function limitInputLengthAndMaxValue(event) {
    let input = event.target
    let maxLength = 5
    let maxValue = 10

    if (input.value.length > maxLength) {
        input.value = input.value.slice(0, maxLength)
    }

    if (input.value > maxValue) {
        input.value = maxValue
    }
}

function blockNegative(event) {
    const key = event.key

    if (key === '-') {
        event.preventDefault()
    }
}
function addStudent() {
    // Get value
    let fullName = document.getElementById('txtName').value
    let dob = document.getElementById('txtDob').value
    let stdId = document.getElementById('txtStdId').value
    let scoreOne = parseFloat(
        document.getElementById('txtScrOne').value
    ).toFixed(1)

    let scoreTwo = parseFloat(
        document.getElementById('txtScrTwo').value
    ).toFixed(1)

    let scoreThree = parseFloat(
        document.getElementById('txtScrThree').value
    ).toFixed(1)
    // End get value

    let newStd = new Student(
        fullName,
        dob,
        stdId,
        scoreOne,
        scoreTwo,
        scoreThree
    )
    if (!listStudent) {
        listStudent = new Class()
    }

    if (
        validateId(stdId) &&
        validateName(fullName) &&
        validateDate(dob) &&
        validateScore(scoreOne, warningScoreOneField) &&
        validateScore(scoreTwo, warningScoreOTwoField) &&
        validateScore(scoreThree, warningScoreThreeField)
    ) {
        listStudent.addNewStd(newStd)

        // Clear data
        clearInputs()
        // End clear data

        // Show section
        showHideSecById(addStdSecId, false)
        // End show section

        if (typeof listStudent.getIsAscName() === 'boolean') {
            listStudent.sortByLastName(listStudent.getIsAscName())
        } else if (typeof listStudent.getIsAscAge() === 'boolean') {
            listStudent.sortByAge(listStudent.getIsAscAge())
        } else if (typeof listStudent.getIsAscStdsId() === 'boolean') {
            listStudent.sortByStId(listStudent.getIsAscStdsId())
        } else if (typeof listStudent.getIsAscScore() === 'boolean') {
            listStudent.sortByScore(listStudent.getIsAscScore())
        } else if (typeof listStudent.getIsAscScrTwo() === 'boolean') {
            listStudent.sortByScrTwo(listStudent.getIsAscScrTwo())
        } else if (typeof listStudent.getIsAscScrThree() === 'boolean') {
            listStudent.sortByScrThree(listStudent.getIsAscScrThree())
        } else if (typeof listStudent.getIsAscScrAvg() === 'boolean') {
            listStudent.sortByAvgScore(listStudent.getIsAscScrAvg())
        }
        showListStds()
    }
}

function editStd(i) {
    showPopup()

    let stdIndex = i

    let updatebtn = document.getElementById('updateStd')
    updatebtn.addEventListener('click', function handleClick() {
        updateStd(stdIndex)
    })

    let std = listStudent.getListStds()[i]

    let fullName = std.getFullName()
    let dob = std.getDob()
    let stdId = std.getStdId()
    let scoreOne = std.getScrOne()
    let scoreTwo = std.getScrTwo()
    let scoreThree = std.getScrThree()

    document.getElementById('editName').value = fullName
    document.getElementById('editDob').value = dob
    document.getElementById('editStdId').disabled = true
    document.getElementById('editStdId').value = stdId
    document.getElementById('editScrOne').value = scoreOne
    document.getElementById('editScrTwo').value = scoreTwo
    document.getElementById('editScrThree').value = scoreThree
}

function updateStd(i) {
    // Get value
    let fullName = document.getElementById('editName').value
    let dob = document.getElementById('editDob').value
    let stdId = document.getElementById('editStdId').value
    let scoreOne = parseFloat(
        document.getElementById('editScrOne').value
    ).toFixed(1)

    let scoreTwo = parseFloat(
        document.getElementById('editScrTwo').value
    ).toFixed(1)

    let scoreThree = parseFloat(
        document.getElementById('editScrThree').value
    ).toFixed(1)
    // End get value

    let updatedStd = new Student(
        fullName,
        dob,
        stdId,
        scoreOne,
        scoreTwo,
        scoreThree
    )

    let std = listStudent.getListStds()

    if (
        validateId(stdId) &&
        validateName(fullName) &&
        validateDate(dob) &&
        validateScore(scoreOne, warningScoreOneField) &&
        validateScore(scoreTwo, warningScoreOTwoField) &&
        validateScore(scoreThree, warningScoreThreeField)
    ) {
        std[i] = updatedStd

        // Hide section
        hidePopup()
        // End hide section
    }

    showListStds()
}

function deleteStd(i) {
    let std = listStudent.getListStds()

    let confirmation = confirm(msgConfirm)
    if (confirmation) {
        std.splice(i, 1)
        showListStds()
    }
}

// Function to add garbage data
function addValStd(type) {
    let valNames = [
        'Nguyễn Văn Thái Học A',
        'Trần Thị B',
        'Lê Văn C',
        'Phạm Thị D',
        'Hoàng Văn E',
        'Nguyễn Thị F',
        'Trần Văn G',
        'Lê Thị Hoàng H',
        'Phạm Văn I',
        'Hoàng Thị K',
        'Nguyễn Văn Huỳnh B',
        'Trần Thị Minh Khai',
        'Lê Văn Tần',
        'Lê Nguyễn Thị Như Quỳnh',
        'Hoàng Văn E',
        'Nguyễn Thị F',
        'Trần Văn G Hung N',
        'Lê Thị Hoàng Hoa T',
        'Phạm Văn Thai Tuệ',
        'Hoàng Thị Minh Khánh M',
    ]
    let valDobs = [
        '1985-06-15',
        '2006-10-06',
        '1990-02-07',
        '2012-10-08',
        '1972-01-12',
        '2001-04-01',
        '1976-12-02',
        '1992-03-05',
        '2003-04-05',
        '2005-01-02',
        '2005-06-09',
        '2003-07-09',
        '1991-08-02',
        '1961-03-01',
        '2001-10-10',
        '2002-06-12',
        '1992-12-08',
        '1989-08-29',
        '2004-10-25',
    ]
    let vlaStdID = [
        'HV000001',
        'HV000002',
        'HV000003',
        'HV000004',
        'HV000005',
        'HV000006',
        'HV000007',
        'HV000008',
        'HV000009',
        'HV000010',
        'HV001210',
        'HV001232',
        'HV004122',
        'HV121012',
        'HV581012',
        'HV091012',
        'HV003501',
        'HV021002',
        'HV540003',
        'HV009924',
        'HV999999',
        'HV213021',
        'HV876444',
        'HV345567',
        'HV093133',
        'HV000212',
        'HV003489',
        'HV123456',
        'HV245455',
        'HV133444',
        'HV555111',
        'HV092223',
    ]
    let valStdID = [
        'HV0001',
        'HV0002',
        'HV0003',
        'HV0004',
        'HV0005',
        'HV0006',
        'HV0007',
        'HV0008',
        'HV0009',
        'HV0010',
        'HV0011',
        'HV0012',
        'HV0013',
        'HV0014',
        'HV0015',
        'HV0016',
        'HV0017',
        'HV0018',
        'HV0019',
        'HV0020',
        'HV0021',
        'HV0022',
        'HV0023',
        'HV0024',
        'HV0025',
        'HV0026',
        'HV0027',
        'HV0028',
        'HV0029',
        'HV0030',
    ]

    let valScrOne = [10, 9, 10, 5, 7, 9, 4, 8, 7, 9, 1, 2, 3, 4]
    let valScrTwo = [9, 7, 8, 4, 9, 7, 5, 10, 9, 9, 1, 2, 3, 4]
    let valScrThree = [6, 9, 6, 8, 9, 10, 7, 8, 9, 10, 1, 2, 3, 4]

    //Get the cells that need extra junk data
    let txtName = document.getElementById('txtName')
    let txtDob = document.getElementById('txtDob')
    let txtStdID = document.getElementById('txtStdId')
    let txtScrOne = document.getElementById('txtScrOne')
    let txtScrTwo = document.getElementById('txtScrTwo')
    let txtScrThree = document.getElementById('txtScrThree')

    // get values ​​from lists
    let randomName = valNames[Math.floor(Math.random() * valNames.length)]
    let randomDob = valDobs[Math.floor(Math.random() * valDobs.length)]

    let randomStdID
    do {
        randomStdID = valStdID[Math.floor(Math.random() * valStdID.length)]
    } while (
        typeof listStudent !== 'undefined' &&
        listStudent.checkExistedStdId(randomStdID)
    )
    let randomScrOne = valScrOne[Math.floor(Math.random() * valScrOne.length)]
    let randomScrTwO = valScrTwo[Math.floor(Math.random() * valScrTwo.length)]
    let randomScrThree =
        valScrThree[Math.floor(Math.random() * valScrThree.length)]

    // assign values ​​to input tags
    txtName.value = randomName
    txtDob.value = randomDob
    txtStdID.value = randomStdID
    txtScrOne.value = randomScrOne
    txtScrTwo.value = randomScrTwO
    txtScrThree.value = randomScrThree
    if (type == tblResultType.all) {
        addStudent()
        showHideSecById(addStdSecId, true)
    }
}
function addSortListener(iconElement, currentStatus, sortName, sortFunction) {
    iconElement.addEventListener('click', function handleClick(event) {
        let removeClass = currentStatus ? icoUpArrow : icoDownArrow
        let addClass = currentStatus ? icoDownArrow : icoUpArrow
        iconElement.classList.remove(removeClass)
        iconElement.classList.add(addClass)

        // Reset sort
        listStudent.setIsAscName(
            sortName == 'Name' ? !currentStatus : undefined
        )
        listStudent.setIsAscStdsId(
            sortName == 'StdsId' ? !currentStatus : undefined
        )
        listStudent.setIsAscAge(sortName == 'Age' ? !currentStatus : undefined)
        listStudent.setIsAscScore(
            sortName == 'Score' ? !currentStatus : undefined
        )
        listStudent.setIsAscScrTwo(
            sortName == 'ScrTwo' ? !currentStatus : undefined
        )
        listStudent.setIsAscScrThree(
            sortName == 'ScrThree' ? !currentStatus : undefined
        )
        listStudent.setIsAscScrAvg(
            sortName == 'ScrAvg' ? !currentStatus : undefined
        )

        // Call sort function
        sortFunction(!currentStatus)
    })
}

function toastMsg(type, msg) {
    let toastMsg = document.getElementById(toastMsgId)

    let toastType = document.createElement('div')
    let toastIcon = document.createElement('div')
    let toastBody = document.createElement('div')
    let toastIconI = document.createElement('i')
    let toastTitle = document.createElement('h3')
    let toastContent = document.createElement('p')

    toastIcon.classList.add(toastIconClass)
    toastBody.classList.add(toastBodyClass)
    toastTitle.classList.add(toastTitleClass)
    toastContent.classList.add(toastContentClass)
    toastContent.innerHTML = msg

    if (type == typeOfToast.success) {
        toastType.classList.add(toastMsgSameClass, successClass)
        toastIconI.classList.add(fontAwesomePrefix, successIconSuffixes)
        toastTitle.innerHTML = successMsg
    } else if (type == typeOfToast.warning) {
        toastType.classList.add(toastMsgSameClass, warningClass)
        toastIconI.classList.add(fontAwesomePrefix, warningIconSuffixes)
        toastTitle.innerHTML = warningMsg
    } else if (type == typeOfToast.error) {
        toastType.classList.add(toastMsgSameClass, errorClass)
        toastIconI.classList.add(fontAwesomePrefix, errorIconSuffixes)
        toastTitle.innerHTML = errorMsg
    }

    toastIcon.appendChild(toastIconI)
    toastBody.appendChild(toastTitle)
    toastBody.appendChild(toastContent)
    toastType.appendChild(toastIcon)
    toastType.appendChild(toastBody)
    toastMsg.appendChild(toastType)

    setTimeout(function () {
        toastMsg.removeChild(toastType)
    }, toastMsgOffTime)
}

function initSecResult() {
    let htmlResult = document.getElementById(tblResult)

    // create element
    let stdNode = document.createElement('tr')
    let tiFullName = document.createElement('th')
    let tiDOB = document.createElement('th')
    let tiStdID = document.createElement('th')
    let tiScoreOne = document.createElement('th')
    let tiScoreTwo = document.createElement('th')
    let tiScoreThree = document.createElement('th')
    let tiAverage = document.createElement('th')
    let tiEdit = document.createElement('th')
    let divFullName = document.createElement('div')
    let divDob = document.createElement('div')
    let divStdID = document.createElement('div')
    let divScrOne = document.createElement('div')
    let divScrTwo = document.createElement('div')
    let divScrThree = document.createElement('div')
    let divAvg = document.createElement('div')

    //add class

    stdNode.classList.add('table-result')
    divFullName.classList.add('cus-title')
    divDob.classList.add('cus-title')
    divStdID.classList.add('cus-title')
    divScrOne.classList.add('cus-title')
    divScrTwo.classList.add('cus-title')
    divScrThree.classList.add('cus-title')
    divAvg.classList.add('cus-title')
    tiFullName.classList.add('table-title')
    tiDOB.classList.add('table-title')
    tiStdID.classList.add('table-title')
    tiScoreOne.classList.add('table-title')
    tiScoreTwo.classList.add('table-title')
    tiScoreThree.classList.add('table-title')
    tiAverage.classList.add('table-title')
    tiEdit.classList.add('table-title')

    //innerHTML

    divFullName.appendChild(document.createElement('p')).textContent = titleName
    let icoNameSort = document.createElement('i')
    let initIconName = listStudent.getIsAscName()

    if (typeof initIconName == 'undefined') {
        initIconName = icoSort
    } else {
        initIconName = listStudent.getIsAscName() ? icoUpArrow : icoDownArrow
    }
    icoNameSort.classList.add(prefixIcoSomeware, initIconName)
    addSortListener(
        icoNameSort,
        listStudent.getIsAscName(),
        sortNameEnum.icoSortName,
        sortByName
    )
    divFullName.appendChild(icoNameSort)
    divDob.appendChild(document.createElement('p')).textContent = titleDOB
    let icoAgeSort = document.createElement('i')
    let initIcoClss = listStudent.getIsAscAge()
    if (typeof initIcoClss == 'undefined') {
        initIcoClss = icoSort
    } else {
        initIcoClss = listStudent.getIsAscAge() ? icoUpArrow : icoDownArrow
    }
    icoAgeSort.classList.add(prefixIcoSomeware, initIcoClss)

    addSortListener(
        icoAgeSort,
        listStudent.getIsAscAge(),
        sortNameEnum.icoSortAge,
        sortByDob
    )
    divDob.appendChild(icoAgeSort)
    divStdID.appendChild(document.createElement('p')).textContent = titleStdID
    let icoStdIdsort = document.createElement('i')
    let initIconStdId = listStudent.getIsAscStdsId()
    if (typeof initIconStdId == 'undefined') {
        initIconStdId = icoSort
    } else {
        initIconStdId = listStudent.getIsAscStdsId() ? icoUpArrow : icoDownArrow
    }
    icoStdIdsort.classList.add(prefixIcoSomeware, initIconStdId)
    addSortListener(
        icoStdIdsort,
        listStudent.getIsAscStdsId(),
        sortNameEnum.icoSortStdId,
        sortByStdsId
    )
    divStdID.appendChild(icoStdIdsort)
    divScrOne.appendChild(document.createElement('p')).textContent = titleScrOne
    let icoScrOneSort = document.createElement('i')
    let initScrOneSort = listStudent.getIsAscScore()
    if (typeof initScrOneSort == 'undefined') {
        initScrOneSort = icoSort
    } else {
        initScrOneSort = listStudent.getIsAscScore() ? icoUpArrow : icoDownArrow
    }
    icoScrOneSort.classList.add(prefixIcoSomeware, initScrOneSort)
    addSortListener(
        icoScrOneSort,
        listStudent.getIsAscScore(),
        sortNameEnum.icoSortScrOne,
        sortByScr
    )
    divScrOne.appendChild(icoScrOneSort)
    divScrTwo.appendChild(document.createElement('p')).textContent = titleScrTwo
    let icoScrTwoSort = document.createElement('i')
    let initScrTwoSort = listStudent.getIsAscScrTwo()
    if (typeof initScrTwoSort == 'undefined') {
        initScrTwoSort = icoSort
    } else {
        initScrTwoSort = listStudent.getIsAscScrTwo()
            ? icoUpArrow
            : icoDownArrow
    }
    icoScrTwoSort.classList.add(prefixIcoSomeware, initScrTwoSort)
    addSortListener(
        icoScrTwoSort,
        listStudent.getIsAscScrTwo(),
        sortNameEnum.icoScrTwo,
        sortByScrTwo
    )
    divScrTwo.appendChild(icoScrTwoSort)
    divScrThree.appendChild(document.createElement('p')).textContent =
        titleScrThree
    let icoScrThreeSort = document.createElement('i')
    let initScrThreeSort = listStudent.getIsAscScrThree()
    if (typeof initScrThreeSort == 'undefined') {
        initScrThreeSort = icoSort
    } else {
        initScrThreeSort = listStudent.getIsAscScrThree()
            ? icoUpArrow
            : icoDownArrow
    }
    icoScrThreeSort.classList.add(prefixIcoSomeware, initScrThreeSort)
    addSortListener(
        icoScrThreeSort,
        listStudent.getIsAscScrThree(),
        sortNameEnum.icoSortScrThree,
        sortByScrThree
    )
    divScrThree.appendChild(icoScrThreeSort)
    divAvg.appendChild(document.createElement('p')).textContent = titleAverage

    let icoAvgSrcSort = document.createElement('i')
    let initAvgSrcSort = listStudent.getIsAscScrAvg()
    if (typeof initAvgSrcSort == 'undefined') {
        initAvgSrcSort = icoSort
    } else {
        initAvgSrcSort = listStudent.getIsAscScrAvg()
            ? icoUpArrow
            : icoDownArrow
    }
    icoAvgSrcSort.classList.add(prefixIcoSomeware, initAvgSrcSort)
    addSortListener(
        icoAvgSrcSort,
        listStudent.getIsAscScrAvg(),
        sortNameEnum.icoSortScrAvg,
        sortByAvgScr
    )
    divAvg.appendChild(icoAvgSrcSort)
    tiEdit.innerHTML = titleEdit
    //
    tiStdID.appendChild(divStdID)
    tiFullName.appendChild(divFullName)
    tiDOB.appendChild(divDob)
    tiScoreOne.appendChild(divScrOne)
    tiScoreTwo.appendChild(divScrTwo)
    tiScoreThree.appendChild(divScrThree)
    tiAverage.appendChild(divAvg)

    //
    stdNode.appendChild(tiStdID)
    stdNode.appendChild(tiFullName)
    stdNode.appendChild(tiDOB)
    stdNode.appendChild(tiScoreOne)
    stdNode.appendChild(tiScoreTwo)
    stdNode.appendChild(tiScoreThree)
    stdNode.appendChild(tiAverage)
    stdNode.appendChild(tiEdit)

    htmlResult.innerHTML = ''
    htmlResult.appendChild(stdNode)
}

function showHTMLSearchResult(htmlSec, listData, type) {
    if (listData.length === 0) {
        let emptyRow = document.createElement('tr')
        let emptyCell = document.createElement('td')
        let emptyContent = document.createElement('h3')
        emptyContent.setAttribute('class', 'p-10 text-center')
        emptyContent.innerHTML = msgNoData

        emptyCell.setAttribute('colspan', '8')
        emptyCell.appendChild(emptyContent)
        emptyRow.appendChild(emptyCell)
        htmlSec.appendChild(emptyRow)
    } else {
        listData.forEach(function (data, index) {
            let stdNode = document.createElement('tr')
            let fullNameEle = document.createElement('td')
            fullNameEle.innerHTML = data.getFullName()
            let dobEle = document.createElement('td')
            dobEle.innerHTML = getFormatDate(data.getDob())
            let stdIdEle = document.createElement('td')
            stdIdEle.innerHTML = data.getStdId()
            let scrOneEle = document.createElement('td')
            scrOneEle.innerHTML = data.getScrOne()
            let scrTwoEle = document.createElement('td')
            scrTwoEle.innerHTML = data.getScrTwo()
            let scrThreeEle = document.createElement('td')
            scrThreeEle.innerHTML = data.getScrThree()
            let scrAvgScrEle = document.createElement('td')
            scrAvgScrEle.innerHTML = data.getAvgScore()
            let editScrEle = document.createElement('td')

            let editStdA = document.createElement('button')
            editStdA.classList.add('edit-icon')
            editStdA.addEventListener('click', function handleClick(event) {
                editStd(index)
            })

            let deleStdA = document.createElement('button')
            deleStdA.classList.add('edit-icon')
            deleStdA.addEventListener('click', function handleClick(event) {
                deleteStd(index)
            })

            let editStdIcon = document.createElement('i')
            editStdIcon.classList.add('fa-solid', 'fa-pen')

            let deleStdIcon = document.createElement('i')
            deleStdIcon.classList.add('fa-solid', 'fa-trash-can')

            //add class
            stdNode.classList.add('info-std')
            fullNameEle.classList.add('info-cont')
            dobEle.classList.add('info-cont')
            stdIdEle.classList.add('info-cont')
            scrOneEle.classList.add('info-cont')
            scrTwoEle.classList.add('info-cont')
            scrThreeEle.classList.add('info-cont')
            scrAvgScrEle.classList.add('info-cont')
            editScrEle.classList.add('info-cont')
            editScrEle.classList.add('box-cus')

            stdNode.append(
                stdIdEle,
                fullNameEle,
                dobEle,
                scrOneEle,
                scrTwoEle,
                scrThreeEle,
                scrAvgScrEle,
                editScrEle
            )
            editScrEle.appendChild(editStdA)
            editScrEle.appendChild(deleStdA)
            editStdA.appendChild(editStdIcon)
            deleStdA.appendChild(deleStdIcon)
            htmlSec.appendChild(stdNode)
        })
        while (type == tblResultType.all) {
            let summaryScores = listStudent.getSummaryScore()
            // Average
            let avgNode = document.createElement('tr')
            let titleAvgEle = document.createElement('td')
            titleAvgEle.colSpan = 3
            titleAvgEle.innerHTML = avgTitle
            titleAvgEle.classList.add('info-cont', 'table-title')
            let firstAvgScr = document.createElement('td')
            firstAvgScr.innerHTML = summaryScores.getAvgScoreOne()
            firstAvgScr.classList.add('info-cont')

            let secondAvgScr = document.createElement('td')
            secondAvgScr.innerHTML = summaryScores.getAvgScoreTwo()
            secondAvgScr.classList.add('info-cont')

            let thirdAvgScr = document.createElement('td')
            thirdAvgScr.innerHTML = summaryScores.getAvgScoreThree()
            thirdAvgScr.classList.add('info-cont')

            let noneAvgScr = document.createElement('td')
            noneAvgScr.classList.add('info-cont-none', 'info-cont')

            let noneAvgEditScr = document.createElement('td')
            noneAvgEditScr.classList.add('info-cont-none', 'info-cont')

            avgNode.appendChild(titleAvgEle)
            avgNode.appendChild(firstAvgScr)
            avgNode.appendChild(secondAvgScr)
            avgNode.appendChild(thirdAvgScr)
            avgNode.appendChild(noneAvgScr)
            avgNode.appendChild(noneAvgEditScr)

            htmlSec.appendChild(avgNode)
            // Max
            let maxNode = document.createElement('tr')
            let titleMaxEle = document.createElement('td')
            titleMaxEle.colSpan = 3
            titleMaxEle.innerHTML = maxTitle
            titleMaxEle.classList.add('info-cont', 'table-title')

            let firstMaxScr = document.createElement('td')
            firstMaxScr.innerHTML = summaryScores.getMaxScoreOne()
            firstMaxScr.classList.add('info-cont')

            let secondMaxScr = document.createElement('td')
            secondMaxScr.innerHTML = summaryScores.getMaxScoreTwo()
            secondMaxScr.classList.add('info-cont')

            let thirdMaxScr = document.createElement('td')
            thirdMaxScr.innerHTML = summaryScores.getMaxScoreThree()
            thirdMaxScr.classList.add('info-cont')

            let noneMaxScr = document.createElement('td')
            noneMaxScr.classList.add('info-cont-none', 'info-cont')

            let noneMaxScrEdit = document.createElement('td')
            noneMaxScrEdit.classList.add('info-cont-none', 'info-cont')

            maxNode.appendChild(titleMaxEle)
            maxNode.appendChild(firstMaxScr)
            maxNode.appendChild(secondMaxScr)
            maxNode.appendChild(thirdMaxScr)
            maxNode.appendChild(noneMaxScr)
            maxNode.appendChild(noneMaxScrEdit)

            htmlSec.appendChild(maxNode)
            // Min
            let minNode = document.createElement('tr')
            let titleMinEle = document.createElement('td')
            titleMinEle.colSpan = 3
            titleMinEle.innerHTML = minTitle
            titleMinEle.classList.add('info-cont', 'table-title')

            let firstMinScr = document.createElement('td')
            firstMinScr.innerHTML = summaryScores.getMinScoreOne()
            firstMinScr.classList.add('info-cont')

            let secondMinScr = document.createElement('td')
            secondMinScr.innerHTML = summaryScores.getMinScoreTwo()
            secondMinScr.classList.add('info-cont')

            let thirdMinScr = document.createElement('td')
            thirdMinScr.innerHTML = summaryScores.getMinScoreThree()
            thirdMinScr.classList.add('info-cont')

            let noneMinScr = document.createElement('td')
            noneMinScr.classList.add('info-cont-none', 'info-cont')

            let noneMinScrEdit = document.createElement('td')
            noneMinScrEdit.classList.add('info-cont-none', 'info-cont')

            minNode.appendChild(titleMinEle)
            minNode.appendChild(firstMinScr)
            minNode.appendChild(secondMinScr)
            minNode.appendChild(thirdMinScr)
            minNode.appendChild(noneMinScr)
            minNode.appendChild(noneMinScrEdit)
            htmlSec.appendChild(minNode)

            type = tblResultType.search
        }
    }
}

function srcCombined() {
    let allListStds = listStudent.getListStds()
    let htmlResult = document.getElementById(tblResult)
    let searchQuery = document.getElementById('txtSearch').value.toLowerCase()
    let searchResultByName = listStudent.searchByName(searchQuery)
    let searchResultByStdId = listStudent.searchByStdId(searchQuery)
    let searchResultFromAge = listStudent.searchFromAge(searchQuery)
    let combinedResult = searchResultByName.concat(
        searchResultByStdId,
        searchResultFromAge
    )
    combinedResult = [...new Set(combinedResult)]
    if (allListStds.length === combinedResult.length) {
        initSecResult()
        showHTMLSearchResult(htmlResult, combinedResult, tblResultType.all)
        showHideEle(showAllStd, true)
    } else {
        initSecResult()
        showHTMLSearchResult(htmlResult, combinedResult, tblResultType.search)
        showHideEle(showAllStd, false)
    }
}
function handlePressEnter() {
    if (event.key === 'Enter') srcCombined()
}
function showListStds() {
    let htmlResult = document.getElementById(tblResult)
    initSecResult()
    showHTMLSearchResult(
        htmlResult,
        listStudent.getListStds(),
        tblResultType.all
    )
    showHideSecById(tblResult, false)
    showHideEle(showAllStd, true)
}

function showHideSecById(id, isHide) {
    let addStdSec = document.getElementById(id)
    addStdSec.hidden = isHide
}

function showHideEle(eleID, displayOvl = true) {
    let eleSecID = document.getElementById(eleID)
    if (displayOvl == true) {
        eleSecID.style.display = 'none'
    } else {
        eleSecID.style.display = 'flex'
    }
}
function hidePopUpByOvl(displayOvl = true) {
    let popUp = document.getElementById(addStdSecId)
    let tabInputs = document.getElementById('secAddStd')
    if (displayOvl == true) {
        popUp.style.display = 'none'
    } else {
        popUp.style.display = 'block'
    }
    tabInputs.addEventListener('click', function (event) {
        event.stopPropagation()
    })
}

function clearInputs() {
    // Get value
    document.getElementById('txtName').value = ''
    document.getElementById('txtDob').value = ''
    document.getElementById('txtStdId').value = ''
    document.getElementById('txtScrOne').value = ''
    document.getElementById('txtScrTwo').value = ''
    document.getElementById('txtScrThree').value = ''
}

function srcByName() {
    let searchQuery = document.getElementById('txtSearch').value.toLowerCase()

    let searchResult = listStudent.searchByName(searchQuery)
    if (searchResult.length > 0) {
        let htmlResult = document.getElementById(tblResult)
        initSecResult()
        showHTMLSearchResult(htmlResult, searchResult, tblResultType.search)
    } else {
        let htmlResult = document.getElementById(tblResult)
        initSecResult()
        showHTMLSearchResult(htmlResult, searchResult, tblResultType.search)
    }
}

function sortByDob(isAsc) {
    let htmlResult = document.getElementById(tblResult)
    initSecResult()
    showHTMLSearchResult(
        htmlResult,
        listStudent.sortByAge(isAsc),
        tblResultType.all
    )
    showHideSecById(tblResult, false)
}
function sortByStdsId(isAsc) {
    let htmlResult = document.getElementById(tblResult)
    initSecResult()
    showHTMLSearchResult(
        htmlResult,
        listStudent.sortByStId(isAsc),
        tblResultType.all
    )
    showHideSecById(tblResult, false)
}
function sortByScr(isAsc) {
    let htmlResult = document.getElementById(tblResult)
    initSecResult()
    showHTMLSearchResult(
        htmlResult,
        listStudent.sortByScore(isAsc),
        tblResultType.all
    )
    showHideSecById(tblResult, false)
}
function sortByScrTwo(isAsc) {
    let htmlResult = document.getElementById(tblResult)
    initSecResult()
    showHTMLSearchResult(
        htmlResult,
        listStudent.sortByScrTwo(isAsc),
        tblResultType.all
    )
    showHideSecById(tblResult, false)
}
function sortByScrThree(isAsc) {
    let htmlResult = document.getElementById(tblResult)
    initSecResult()
    showHTMLSearchResult(
        htmlResult,
        listStudent.sortByScrThree(isAsc),
        tblResultType.all
    )
    showHideSecById(tblResult, false)
}
function sortByName(isAsc) {
    let htmlResult = document.getElementById(tblResult)
    initSecResult()
    showHTMLSearchResult(
        htmlResult,
        listStudent.sortByLastName(isAsc),
        tblResultType.all
    )
    showHideSecById(tblResult, false)
}
function sortByAvgScr(isAsc) {
    let htmlResult = document.getElementById(tblResult)
    initSecResult()
    showHTMLSearchResult(
        htmlResult,
        listStudent.sortByAvgScore(isAsc),
        tblResultType.all
    )
    showHideSecById(tblResult, false)
}
function srcFromAge() {
    let searchQuery = document.getElementById('txtSearch').value.toLowerCase()

    let searchResult = listStudent.searchFromAge(searchQuery)
    if (searchResult.length > 0) {
        let htmlResult = document.getElementById(tblResult)
        initSecResult()
        showHTMLSearchResult(htmlResult, searchResult)
    } else {
        let htmlResult = document.getElementById(tblResult)
        initSecResult()
        showHTMLSearchResult(htmlResult, searchResult, tblResultType.search)
    }
}

function srcByStdId() {
    let searchQuery = document.getElementById('txtSearch').value.toLowerCase()

    let searchResult = listStudent.searchByStdId(searchQuery)
    if (searchResult.length > 0) {
        let htmlResult = document.getElementById(tblResult)
        initSecResult()
        showHTMLSearchResult(htmlResult, searchResult, tblResultType.search)
    } else {
        let htmlResult = document.getElementById(tblResult)
        initSecResult()
        showHTMLSearchResult(htmlResult, searchResult, tblResultType.search)
    }
}
function getFormatDate(input) {
    let datePart = input.match(/\d+/g)
    let month = datePart[1].padStart(2, '0')
    let day = datePart[2].padStart(2, '0')
    let year = datePart[0]
    return day + '/' + month + '/' + year
}

class SummaryScore {
    #avgScoreOne
    #avgScoreTwo
    #avgScoreThree
    #maxScoreOne
    #maxScoreTwo
    #maxScoreThree
    #minScoreOne
    #minScoreTwo
    #minScoreThree

    constructor() {}

    setAvgScoreOne = function (val) {
        this.#avgScoreOne = val
    }

    getAvgScoreOne = function () {
        return this.#avgScoreOne
    }

    setAvgScoreTwo = function (val) {
        this.#avgScoreTwo = val
    }

    getAvgScoreTwo = function () {
        return this.#avgScoreTwo
    }

    setAvgScoreThree = function (val) {
        this.#avgScoreThree = val
    }

    getAvgScoreThree = function () {
        return this.#avgScoreThree
    }

    // For Max Value
    setMaxScoreOne = function (val) {
        this.#maxScoreOne = val
    }

    getMaxScoreOne = function () {
        return this.#maxScoreOne
    }

    setMaxScoreTwo = function (val) {
        this.#maxScoreTwo = val
    }

    getMaxScoreTwo = function () {
        return this.#maxScoreTwo
    }

    setMaxScoreThree = function (val) {
        this.#maxScoreThree = val
    }

    getMaxScoreThree = function () {
        return this.#maxScoreThree
    }
    //
    // For Min Value
    setMinScoreOne = function (val) {
        this.#minScoreOne = val
    }

    getMinScoreOne = function () {
        return this.#minScoreOne
    }

    setMinScoreTwo = function (val) {
        this.#minScoreTwo = val
    }

    getMinScoreTwo = function () {
        return this.#minScoreTwo
    }

    setMinScoreThree = function (val) {
        this.#minScoreThree = val
    }

    getMinScoreThree = function () {
        return this.#minScoreThree
    }
    //
}

class Student {
    #fullName
    #dob
    #stdId
    #scrOne
    #scrTwo
    #scrThree

    constructor(
        txtFullName = '',
        txtDob = '',
        txtStdId = '',
        txtSrcOne = 0,
        txtSrcTwo = 0,
        txtSrcThree = 0
    ) {
        this.#fullName = txtFullName
        this.#dob = txtDob
        this.#stdId = txtStdId
        this.#scrOne = txtSrcOne
        this.#scrTwo = txtSrcTwo
        this.#scrThree = txtSrcThree
    }

    setFullName = function (val) {
        this.#fullName = val
    }

    getFullName = function () {
        return this.#fullName
    }

    setDob = function (val) {
        this.#dob = val
    }

    getDob = function () {
        return this.#dob
    }

    setStdId = function (val) {
        this.#stdId = val
    }

    getStdId = function () {
        return this.#stdId
    }

    setScrOne = function (val) {
        this.#scrOne = val
    }

    getScrOne = function () {
        return this.#scrOne
    }

    setScrTwo = function (val) {
        this.#scrTwo = val
    }

    getScrTwo = function () {
        return this.#scrTwo
    }

    setScrThree = function (val) {
        this.#scrThree = val
    }

    getScrThree = function () {
        return this.#scrThree
    }

    getAge = function () {
        let birthdate = new Date(this.#dob)
        let today = new Date()
        let age = today.getFullYear() - birthdate.getFullYear()

        if (
            today.getMonth() < birthdate.getMonth() ||
            (today.getMonth() === birthdate.getMonth() &&
                today.getDate() < birthdate.getDate())
        ) {
            age--
        }

        return parseInt(age)
    }

    getAvgScore = function () {
        return (
            (parseFloat(this.#scrOne) +
                parseFloat(this.#scrTwo) +
                parseFloat(this.#scrThree)) /
            3
        ).toFixed(1)
    }
}

class Class {
    #listStds
    #isAscAge
    #isAscStdId
    #isAscName
    #isAscScore
    #isAscScrTwo
    #isAscScrThree
    #isAscAvgScore
    constructor() {
        this.#listStds = []
    }
    addNewStd = function (std) {
        this.#listStds.push(std)
    }

    setListStds = function (list) {
        this.#listStds = list
    }

    getListStds = function () {
        return this.#listStds
    }

    getIsAscAge = function () {
        return this.#isAscAge
    }

    setIsAscAge = function (status) {
        this.#isAscAge = status
    }

    getIsAscStdsId = function () {
        return this.#isAscStdId
    }

    setIsAscStdsId = function (status) {
        this.#isAscStdId = status
    }
    getIsAscName = function () {
        return this.#isAscName
    }

    setIsAscName = function (status) {
        this.#isAscName = status
    }
    getIsAscScore = function () {
        return this.#isAscScore
    }
    setIsAscScore = function (status) {
        this.#isAscScore = status
    }
    getIsAscScrTwo = function () {
        return this.#isAscScrTwo
    }
    setIsAscScrTwo = function (status) {
        this.#isAscScrTwo = status
    }
    getIsAscScrThree = function () {
        return this.#isAscScrThree
    }
    setIsAscScrThree = function (status) {
        this.#isAscScrThree = status
    }
    getIsAscScrAvg = function () {
        return this.#isAscAvgScore
    }
    setIsAscScrAvg = function (status) {
        this.#isAscAvgScore = status
    }

    searchByName = function (val) {
        let searchResult = this.#listStds.filter(function (std) {
            let fullName = std.getFullName().toLowerCase()
            return fullName.trim() !== '' && fullName.includes(val.trim())
        })
        if (val.trim().length == 0 || val.trim() == '') {
            return (val = [])
        }
        return searchResult
    }

    searchByStdId = function (val) {
        let searchResult = this.#listStds.filter(function (std) {
            let stdId = std.getStdId().toLowerCase()
            return stdId !== '' && stdId.includes(val)
        })
        return searchResult
    }

    checkExistedStdId = function (val) {
        let checkResult = this.#listStds.some(function (student) {
            let stdId = student.getStdId()
            return stdId.includes(val)
        })
        return checkResult
    }
    sortByAge = function (isAsc = true) {
        let sortRslt = this.#listStds.sort(function (a, b) {
            let dateA = new Date(a.getDob())
            let dateB = new Date(b.getDob())
            if (dateA > dateB) return 1
            return -1
        })
        return isAsc ? sortRslt : sortRslt.reverse()
    }
    sortByStId = function (isAsc = true) {
        let sortRslt = this.#listStds.sort(function (a, b) {
            let numberA = parseInt(a.getStdId().slice(2))
            let numberB = parseInt(b.getStdId().slice(2))
            if (numberA > numberB) {
                return 1
            }
            return -1
        })

        return isAsc ? sortRslt : sortRslt.reverse()
    }
    sortByScore = function (isAsc = true) {
        let sortRslt = this.#listStds.sort(function (a, b) {
            let numberA = parseInt(a.getScrOne())
            let numberB = parseInt(b.getScrOne())
            if (numberA > numberB) {
                return 1
            }
            return -1
        })

        return isAsc ? sortRslt : sortRslt.reverse()
    }
    sortByScrTwo = function (isAsc = true) {
        let sortRslt = this.#listStds.sort(function (a, b) {
            let numberA = parseInt(a.getScrTwo())
            let numberB = parseInt(b.getScrTwo())
            if (numberA > numberB) {
                return 1
            }
            return -1
        })

        return isAsc ? sortRslt : sortRslt.reverse()
    }
    sortByScrThree = function (isAsc = true) {
        let sortRslt = this.#listStds.sort(function (a, b) {
            let numberA = parseInt(a.getScrThree())
            let numberB = parseInt(b.getScrThree())
            if (numberA > numberB) {
                return 1
            }
            return -1
        })

        return isAsc ? sortRslt : sortRslt.reverse()
    }
    sortByLastName = function (isAsc = true) {
        let sortRslt = this.#listStds.sort(function (a, b) {
            let lastNameA = a.getFullName().split(' ').pop().toLowerCase()
            let lastNameB = b.getFullName().split(' ').pop().toLowerCase()
            if (lastNameA > lastNameB) {
                return 1
            }
            return -1
        })

        return isAsc ? sortRslt : sortRslt.reverse()
    }
    sortByAvgScore = function (isAsc = true) {
        let sortRslt = this.#listStds.sort(function (a, b) {
            let avgScrA = parseInt(a.getAvgScore())
            let avgScrB = parseInt(b.getAvgScore())
            if (avgScrA > avgScrB) {
                return 1
            }
            return -1
        })

        return isAsc ? sortRslt : sortRslt.reverse()
    }
    searchFromAge = function (val, isAsc = true) {
        let searchResult = this.#listStds.filter(function (std) {
            let stdAge = std.getAge()
            return (
                stdAge !== '' &&
                !isNaN(stdAge) &&
                Number.parseInt(stdAge) >= Number.parseInt(val)
            )
        })
        return isAsc ? searchResult : searchResult.reverse()
    }

    getSummaryScore = function () {
        if (this.#listStds.length > 0) {
            let summaryResult = new SummaryScore()
            let tempAvgScoreOne = 0
            let tempAvgScoreTwo = 0
            let tempAvgScoreThree = 0
            this.#listStds.forEach(function (std) {
                // For Average
                tempAvgScoreOne += Number.parseFloat(std.getScrOne())
                tempAvgScoreTwo += Number.parseFloat(std.getScrTwo())
                tempAvgScoreThree += Number.parseFloat(std.getScrThree())
                // End Average
                // For Max
                if (!summaryResult.getMaxScoreOne()) {
                    summaryResult.setMaxScoreOne(std.getScrOne())
                } else {
                    if (
                        Number.parseFloat(summaryResult.getMaxScoreOne()) <
                        Number.parseFloat(std.getScrOne())
                    ) {
                        summaryResult.setMaxScoreOne(std.getScrOne())
                    }
                }
                if (!summaryResult.getMaxScoreTwo()) {
                    summaryResult.setMaxScoreTwo(std.getScrTwo())
                } else {
                    if (
                        Number.parseFloat(summaryResult.getMaxScoreTwo()) <
                        Number.parseFloat(std.getScrTwo())
                    ) {
                        summaryResult.setMaxScoreTwo(std.getScrTwo())
                    }
                }
                if (!summaryResult.getMaxScoreThree()) {
                    summaryResult.setMaxScoreThree(std.getScrThree())
                } else {
                    if (
                        Number.parseFloat(summaryResult.getMaxScoreThree()) <
                        Number.parseFloat(std.getScrThree())
                    ) {
                        summaryResult.setMaxScoreThree(std.getScrThree())
                    }
                }
                // End for Max
                // For Min
                if (!summaryResult.getMinScoreOne()) {
                    summaryResult.setMinScoreOne(std.getScrOne())
                } else {
                    if (
                        Number.parseFloat(summaryResult.getMinScoreOne()) >
                        Number.parseFloat(std.getScrOne())
                    ) {
                        summaryResult.setMinScoreOne(std.getScrOne())
                    }
                }
                if (!summaryResult.getMinScoreTwo()) {
                    summaryResult.setMinScoreTwo(std.getScrTwo())
                } else {
                    if (
                        Number.parseFloat(summaryResult.getMinScoreTwo()) >
                        Number.parseFloat(std.getScrTwo())
                    ) {
                        summaryResult.setMinScoreTwo(std.getScrTwo())
                    }
                }
                if (!summaryResult.getMinScoreThree()) {
                    summaryResult.setMinScoreThree(std.getScrThree())
                } else {
                    if (
                        Number.parseFloat(summaryResult.getMinScoreThree()) >
                        Number.parseFloat(std.getScrThree())
                    ) {
                        summaryResult.setMinScoreThree(std.getScrThree())
                    }
                }
                // End for Min
            })
            tempAvgScoreOne = tempAvgScoreOne / this.#listStds.length
            tempAvgScoreTwo = tempAvgScoreTwo / this.#listStds.length
            tempAvgScoreThree = tempAvgScoreThree / this.#listStds.length

            summaryResult.setAvgScoreOne(tempAvgScoreOne.toFixed(1))
            summaryResult.setAvgScoreTwo(tempAvgScoreTwo.toFixed(1))
            summaryResult.setAvgScoreThree(tempAvgScoreThree.toFixed(1))

            return summaryResult
        }
        return null
    }
}
