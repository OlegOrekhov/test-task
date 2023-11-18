const header = document.querySelector('.header')
const cookiesModal = document.querySelector('.cookies-modal')
const cookiesModalContent = document.querySelector('.cookies-modal__container--wrapper')
const successModal = document.querySelector('.success-modal')
const ctaModal = document.querySelector('.cta-modal')
const burgerMenu = document.querySelector('.burger-menu')

const cookiesModalCloseBtn = document.querySelectorAll('.cookies-modal__close-btn')
const successModalCloseBtn = document.querySelectorAll('.success-modal__close-btn')

const burgerOpenBtn = document.querySelector('.burger-menu__open-btn')
const burgerCloseBtn = document.querySelector('.burger-menu__close-btn')
const burgerContactBtn = document.querySelector('.burger-menu__contact-btn')

const contactModalOpenBtn = document.querySelectorAll('.contact-btn')
const contactModalCloseBtn = document.querySelector('.cta-modal__close-btn')
const ctaModalSubmitBtn = document.querySelector('.cta-modal__submit-btn')

const form = document.getElementById('cta-modal-form')
const nameField = document.getElementById('name')
const emailField = document.getElementById('email')
const phoneField = document.getElementById('phone')
const companyField = document.getElementById('company')
const websiteField = document.getElementById('website')

const validateFields = document.querySelectorAll('.validation')
const fillingFieldsStatus = document.querySelectorAll('.form__field__content__status--required')
const validationFieldsStatus = document.querySelectorAll('.form__field__content__status--valid')
const fillingStatus = document.querySelector('.cta-modal__container__status')

window.addEventListener('scroll', function () {
  const scrollPosition = window.scrollY
  if (scrollPosition >= 38) {
    header.classList.add('sticky-nav')
  } else if (scrollPosition < 38) {
    header.classList.remove('sticky-nav')
  }
})

const scrollDisabled = () => {
  window.scrollTo({ top: 0 })
}

const cookiesModalVisible = () => {
  setTimeout(() => {
    cookiesModal.classList.add('visible')
    cookiesModalContent.classList.add('visible')

    window.addEventListener('scroll', scrollDisabled)
  }, 1000)
}

cookiesModalCloseBtn.forEach((e) => {
  e.addEventListener('click', () => {
    cookiesModal.classList.remove('visible')
    cookiesModalContent.classList.remove('visible')
    cookiesModalContent.classList.add('invisible')
    window.removeEventListener('scroll', scrollDisabled)
  })
})

const successModalVisible = () => {
  successModal.classList.add('visible')
}

successModalCloseBtn.forEach((e) => {
  e.addEventListener('click', () => {
    successModal.classList.remove('visible')
  })
})

const burgerMenuVisible = () => {
  burgerMenu.classList.add('visible'), window.addEventListener('scroll', scrollDisabled)
}

const burgerMenuHidden = () => {
  burgerMenu.classList.remove('visible'), window.removeEventListener('scroll', scrollDisabled)
}

burgerOpenBtn.addEventListener('click', () => {
  burgerMenuVisible()
})

burgerCloseBtn.addEventListener('click', () => {
  burgerMenuHidden()
})

burgerContactBtn.addEventListener('click', () => {
  burgerMenuHidden()
  ctaModalVisible()
})

const contactModalVisible = () => {
  ctaModal.classList.add('visible')
}

contactModalOpenBtn.forEach((e) => {
  e.addEventListener('click', contactModalVisible)
})

// Validation part

const checkFieldsFilling = () => {
  for (let i = 0; i < validateFields.length; i++) {
    if (!validateFields[i].value) {
      fillingFieldsStatus[i].classList.add('required')
      validateFields[i].classList.add('required')
      fillingStatus.classList.add('required')
    } else if (validateFields[i].value) {
      fillingFieldsStatus[i].classList.remove('required')
      validateFields[i].classList.remove('required')
      fillingStatus.classList.remove('required')
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const onNameInput = (e) => {
    const input = e.target
    if (input.value.length <= 1 && input.value.length > 0) {
      validationFieldsStatus[0].classList.add('not-valid')
    } else if (input.value.length === 0 || input.value.length > 1) {
      validationFieldsStatus[0].classList.remove('not-valid')
    }
  }

  nameField.addEventListener('input', onNameInput)
})

document.addEventListener('DOMContentLoaded', () => {
  const onEmailInput = (e) => {
    const input = e.target
    const validEmailTemplate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!input.value.match(validEmailTemplate) && input.value.length > 0) {
      validationFieldsStatus[1].classList.add('not-valid')
    } else if (input.value.match(validEmailTemplate) || input.value.length === 0) {
      validationFieldsStatus[1].classList.remove('not-valid')
    }
  }

  emailField.addEventListener('input', onEmailInput)
})

document.addEventListener('DOMContentLoaded', () => {
  let getInputNumberValue = (input) => {
    return input.value.replace(/\D/g, '')
  }

  let onPhoneInput = (e) => {
    let input = e.target,
      inputNumbersValue = getInputNumberValue(input),
      formattedInputValue = '',
      selectionStart = input.selectionStart

    if (!inputNumbersValue) {
      return (input.value = '')
    }

    if (input.value.length != selectionStart) {
      if (e.data && /\D/g.test(e.data)) {
        input.value = inputNumbersValue
      }
      return
    }

    if (['7', '8', '9'].indexOf(inputNumbersValue[0]) > -1) {
      if (inputNumbersValue[0] === '9') inputNumbersValue = '7' + inputNumbersValue
      let firstSymbols = inputNumbersValue[0] === '8' ? '+7' : '+7'
      formattedInputValue = firstSymbols + ' '
      if (inputNumbersValue.length > 1) {
        formattedInputValue += inputNumbersValue.substring(1, 4)
      }
      if (inputNumbersValue.length >= 5) {
        formattedInputValue += ' ' + inputNumbersValue.substring(4, 7)
      }
      if (inputNumbersValue.length >= 8) {
        formattedInputValue += ' ' + inputNumbersValue.substring(7, 9)
      }
      if (inputNumbersValue.length >= 10) {
        formattedInputValue += ' ' + inputNumbersValue.substring(9, 11)
      }
    } else {
      formattedInputValue = ''
    }
    input.value = formattedInputValue
  }

  let onPhoneKeyDown = (e) => {
    let input = e.target
    if (e.keyCode === 8 && getInputNumberValue(input).length === 1) {
      input.value = '1'
    }
  }

  let onPhonePaste = (e) => {
    let pasted = e.clipboardData || window.clipboardData
    input = e.target
    inputNumbersValue = getInputNumberValue(input)

    if (pasted) {
      let pastedText = pasted.getData('Text')
      if (/\D/g.test(pastedText)) {
        input.value = inputNumbersValue
      }
    }
  }

  let onPhoneValidation = (e) => {
    let input = e.target
    if (input.value.length < 16 && input.value.length > 0) {
      validationFieldsStatus[2].classList.add('not-valid')
    } else if (input.value.length === 0 || input.value.length == 16) {
      validationFieldsStatus[2].classList.remove('not-valid')
    }
  }

  phoneField.addEventListener('input', onPhoneInput)
  phoneField.addEventListener('input', onPhoneValidation)
  phoneField.addEventListener('keydown', onPhoneKeyDown)
  phoneField.addEventListener('paste', onPhonePaste)
})

const checkOnAvailableRequiredErrors = () => {
  let result = []
  fillingFieldsStatus.forEach((e) => {
    if (e.classList.contains('required')) {
      result += false
    }
  })
  if (!result.includes(false)) {
    return true
  }
}

const checkOnAvailableValidationErrors = () => {
  let result = []
  validationFieldsStatus.forEach((e) => {
    if (e.classList.contains('not-valid')) {
      result += false
    }
  })
  if (!result.includes(false)) {
    return true
  }
}

const totalCheckOnErrors = () => {
  if (checkOnAvailableRequiredErrors() && checkOnAvailableValidationErrors()) {
    return true
  }
}

const clearFieldsError = () => {
  for (let i = 0; i < validateFields.length; i++) {
    fillingFieldsStatus[i].classList.remove('required')
    validationFieldsStatus[i].classList.remove('not-valid')
    validateFields[i].classList.remove('required')
    fillingStatus.classList.remove('required')
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  checkFieldsFilling()
  if (totalCheckOnErrors()) {
    ctaModal.classList.remove('visible')
    successModalVisible()
    e.target.reset()
  }
})

contactModalCloseBtn.addEventListener('click', () => {
  form.reset()
  clearFieldsError()
  ctaModal.classList.remove('visible')
})

const initialState = () => {
  cookiesModalVisible()
}

initialState()
