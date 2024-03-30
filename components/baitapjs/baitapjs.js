const displaySecToN = 'section_to_n'
const querySectionId = 'input_n'
const warnNaturalNumMes = 'Vui lòng nhập số nguyên lớn hơn 0'

const querySectionConvertId = 'input_n_convert'
const displaySecConvertN = 'section_converted_display'

function inputArr() {
    let myArr = []
    let stop = false
    do {
        let val = prompt(
            `Nhập phần tử thứ ${
                myArr.length + 1
            } của mảng (Kết thúc nhập bằng ký tự ~):`
        ).trim()
        if (val == '~') {
            stop = true
        } else {
            if (isNaN(val)) {
                alert(
                    'Vui lòng nhập số để tính tổng. Nhập cái khác sao tính mấy ba!!!!!'
                )
            } else {
                myArr.push(parseFloat(val))
            }
        }
    } while (!stop)
    return myArr
}

function sumValArr(arr) {
    let sum = 0
    arr.forEach((val) => {
        sum += parseFloat(val)
    })
    return sum
}

function orderArr(arr, isAsc = true) {
    let ascArr = arr.sort((a, b) => {
        if (a > b) return a
        return b
    })
    if (isAsc) {
        return ascArr
    }
    return ascArr.reverse()
}

function isPrime(number) {
    if (number <= 1) {
        return false
    }

    for (let i = 2; i < number; i++) {
        if (number % i == 0) {
            return false
        }
    }
    return true
}

function isPerSquare(input) {
    if (
        input === undefined ||
        input < 0 ||
        input.trim() == '' ||
        !Number.isInteger(parseFloat(input)) ||
        Math.sqrt(input) % 1 != 0
    ) {
        return false
    }
    return true
}

function baiTapOne() {
    let val = prompt('Số cần check: ')
    let check = val % 1 == 0 && val > 0
    alert(check)
}

function baiTapTwo() {
    let val = prompt('Số cần check: ')
    let check = val % 1 == 0 && val < 0
    alert(check)
}

function baiTapThree() {
    let valOne = parseFloat(prompt('Số thứ 1: '))
    let valTwo = parseFloat(prompt('Số thứ 2: '))
    let sum = valOne + valTwo
    alert(sum)
}

function baiTapFour() {
    let myArr = inputArr()
    alert(`Tổng phần tử trong mảng là: ${sumValArr(myArr)} `)
}

function baiTapSix() {
    let val = inputByUser()
    if (isPrime(val)) {
        alert(`${val} là số nguyên tố.`)
    } else {
        alert(`${val} không phải là số nguyên tố.`)
    }
}

function inputByUser() {
    let inputVal
    let valid = false

    do {
        inputVal = prompt('Nhập một số nguyên cần kiểm tra:')
        valid = isNumber(inputVal, 1)
        if (!valid) {
            alert('Vui lòng chỉ nhập số nguyên.')
        }
    } while (!valid)

    return inputVal
}

function baiTapSeven() {
    let userArr = inputArr()
    userArr = orderArr(userArr)
    alert(
        `Số nhỏ nhất là: ${userArr[0]}\nSố lớn nhất là: ${
            userArr[parseInt(userArr.length / 2)]
        }`
    )
}

function baiTapEight() {
    let userInput = prompt('Vui lòng nhập số cần kiểm tra: ')
    let checkPerSquare = isPerSquare(userInput)
    // let msg = ` ${checkPerSquare ? '' : 'không'} là số chính phương`
    let msg = checkPerSquare
        ? ' là số chính phương'
        : ' không là số chính phương'
    alert(`${userInput}${msg}`)
}

function baiTapNine() {
    let alertMsg = giaiPtBacMot()
    alert(alertMsg)
}

function giaiPtBacMot() {
    const a = parseInt(prompt('Nhập giá trị a = '))
    const b = parseInt(prompt('Nhập giá tri b = '))

    let msg

    if (a == 0) {
        if (b == 0) {
            msg = 'Phương trình có vô số nghiệm.'
        } else {
            msg = 'Phương trình vô nghiệm.'
        }
    } else {
        msg = `Phương trình có nghiệm là x = ${-b / a}`
    }
    return msg
}

function printValueHtmlId(id, msg) {
    let ele = document.getElementById(id)
    ele.innerHTML = msg
}

function valueFromOneToN(n) {
    let msg = `Số nguyên từ 1 đến ${n} là: \n`
    for (let i = 1; i <= n; i++) {
        msg += `${i}\t`
    }
    return msg
}

function valuePrimeOneToN(n) {
    let msg = `Số nguyên tố từ 1 đến ${n} là: \n`
    for (let i = 1; i <= n; i++) {
        if (isPrime(i)) {
            msg += `${i}\t`
        }
    }
    return msg
}

function sumEvenToN(n) {
    let cond = false
    let sum = 0
    let i = 0
    while (!cond) {
        if (i % 2 == 0) {
            sum += i
        }
        i++
        if (i > n) {
            cond = true
        }
    }
    return `Tổng số chẵn từ 0 đến ${n} là : ${sum}`
}

function printToN() {
    let valN = getNValFromId(querySectionId, warnNaturalNumMes)
    printValueHtmlId(displaySecToN, valueFromOneToN(valN))
}

function printPrimeToN() {
    let valN = getNValFromId(querySectionId, warnNaturalNumMes)
    printValueHtmlId(displaySecToN, valuePrimeOneToN(valN))
}

function printSumEvenToN() {
    let valN = getNValFromId(querySectionId, warnNaturalNumMes)
    printValueHtmlId(displaySecToN, sumEvenToN(valN))
}

function createSections(number) {
    let msg = ''
    for (let i = 1; i <= number; i++) {
        msg += `<div class='box-color'>${i}</div>`
    }
    return msg
}

function checkSectionColor() {
    return (
        document.getElementsByClassName('red-color').length > 0 ||
        document.getElementsByClassName('blue-color').length > 0
    )
}

function createSectionsByArr(arr) {
    let msg = ''
    for (let i = 0; i < arr.length; i++) {
        if (checkSectionColor()) {
            if (i % 2 == 0) {
                msg += `<div class='box-color red-color'>${arr[i]}</div>`
            } else {
                msg += `<div class='box-color blue-color'>${arr[i]}</div>`
            }
        } else {
            msg += `<div class='box-color'>${arr[i]}</div>`
        }
    }
    return msg
}

function changeSectionColors(number) {
    let msg = ''
    for (let i = 1; i <= number; i++) {
        if (i % 2 != 0) {
            msg += `<div class='box-color red-color'>${i}</div>`
        } else {
            msg += `<div class='box-color blue-color'>${i}</div>`
        }
    }
    return msg
}

function createSecs() {
    let valN = getNValFromId(querySectionId, warnNaturalNumMes)
    printValueHtmlId(displaySecToN, createSections(valN))
}

function changeSecColors() {
    let valN = getNValFromId(querySectionId, warnNaturalNumMes)
    printValueHtmlId(displaySecToN, changeSectionColors(valN))
}

function removeSections(type) {
    let elements = document.getElementsByClassName('box-color')
    let msg = ''
    let valArr = []
    for (let i = 0; i < elements.length; i++) {
        let cond = false
        if (type == 1) {
            cond = i % 2 != 0
        } else if (type == 0) {
            cond = i % 2 == 0
        }
        if (cond) {
            valArr.push(elements[i].innerHTML)
        }
    }
    msg = createSectionsByArr(valArr)
    return msg
}

function removeSecs(type) {
    const displayId = 'section_custom'
    let msg = ''
    switch (type) {
        case 0:
        case 1:
            msg = removeSections(type)
            break
        default:
            break
    }
    printValueHtmlId(displayId, msg)
}

function convertFromDecimal() {
    let valN = getNValFromId(querySectionConvertId, warnNaturalNumMes)
    let binaryVal = convertDecToOther(valN, 2)
    let octaVal = convertDecToOther(valN, 8)
    let hexaVal = convertDecToOther(valN, 16)
    let msg = `Hệ thập phân: ${valN} thì: <br/> Hệ nhị phân là : ${binaryVal} <br/> Hệ bát phân là: ${octaVal} <br/> Hệ thập lục phân là: ${hexaVal}`
    printValueHtmlId(displaySecConvertN, msg)
}

function convertFromBinary() {
    let valN = getNValFromId(querySectionConvertId, warnNaturalNumMes)
    let decVal = convertOtherToDec(valN, 2)
    let octaVal = convertDecToOther(decVal, 8)
    let hexaVal = convertDecToOther(decVal, 16)
    let msg = `Hệ nhị phân: ${valN} thì: <br/> Hệ thập phân là : ${decVal} <br/> Hệ bát phân là: ${octaVal} <br/> Hệ thập lục phân là: ${hexaVal}`
    printValueHtmlId(displaySecConvertN, msg)
}

function convertFromOcta() {
    let valN = getNValFromId(querySectionConvertId, warnNaturalNumMes)
    let decVal = convertOtherToDec(valN, 8)
    let binaryVal = convertDecToOther(decVal, 2)
    let hexaVal = convertDecToOther(decVal, 16)
    let msg = `Hệ bát phân: ${valN} thì: <br/> Hệ thập phân là : ${decVal} <br/> Hệ nhị phân là: ${binaryVal} <br/> Hệ thập lục phân là: ${hexaVal}`
    printValueHtmlId(displaySecConvertN, msg)
}

function convertFromHexa() {
    let valN = document.getElementById(querySectionConvertId).value
    let decVal = convertOtherToDec(valN, 16)
    let binaryVal = convertDecToOther(decVal, 2)
    let octaVal = convertDecToOther(decVal, 8)
    let msg = `Hệ thập lục phân: ${valN} thì: <br/> Hệ thập phân là : ${decVal} <br/> Hệ nhị phân là: ${binaryVal} <br/> Hệ bát phân là: ${octaVal}`
    printValueHtmlId(displaySecConvertN, msg)
}

/// Will seperate
function isNumber(input, type) {
    // Definition
    //// Type 1 : Integer
    //// Type 2 : Float
    let result = false
    try {
        result = !(input == undefined || input.trim() == '' || isNaN(input))
        if (type == 1) {
            result = result && Number.isInteger(parseFloat(input))
        }
        return result
    } catch (ex) {
        return false
    }
}

function isNaturalNumber(input) {
    return isNumber(input, 1) && input > 0
}

function getNValFromId(id, warnMess) {
    let ele = document.getElementById(id)
    let cond = false
    cond = isNaturalNumber(ele.value)
    if (cond) {
        return Number.parseInt(ele.value)
    } else {
        alert(warnMess)
        ele.focus()
    }
}

function convertModToHexa(mod) {
    let returnVal = ''
    switch (mod) {
        case 10:
            returnVal = 'A'
            break
        case 11:
            returnVal = 'B'
            break
        case 12:
            returnVal = 'C'
            break
        case 13:
            returnVal = 'D'
            break
        case 14:
            returnVal = 'E'
            break
        case 15:
            returnVal = 'F'
            break
        default:
            break
    }
    return returnVal
}

function convertHexaCharToDec(char) {
    let returnVal = ''
    switch (char) {
        case 'A':
            returnVal = 10
            break
        case 'B':
            returnVal = 11
            break
        case 'C':
            returnVal = 12
            break
        case 'D':
            returnVal = 13
            break
        case 'E':
            returnVal = 14
            break
        case 'F':
            returnVal = 15
            break
        default:
            returnVal = char
            break
    }
    return returnVal
}

function convertDecToOther(number, toType) {
    let myValArr = []
    let remainVal = number
    while (remainVal > 0) {
        let mod
        mod = remainVal % Number.parseInt(toType)
        remainVal = Number.parseInt(remainVal / Number.parseInt(toType))
        if (toType == 16 && mod > 9) {
            mod = convertModToHexa(mod)
        }
        myValArr.push(mod)
    }
    myValArr = myValArr.reverse()
    return myValArr.join('')
}

function convertOtherToDec(number, fromType) {
    let myValArr = (number + '').split('')
    let result = 0
    for (let i = 0; i < myValArr.length; i++) {
        let myVal = myValArr[myValArr.length - 1 - i]
        myVal = convertHexaCharToDec(myVal)
        result += myVal * Number.parseInt(fromType) ** i
    }
    return result
}
