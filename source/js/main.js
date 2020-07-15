(function () {
  const ClassName = {
    INFO_MENU_HEADLINE: `.info-menu__headline`,
    COLLAPSED_BLOCK: `info-menu--collapsed`,
    CALLBACK_BUTTON: `.header__callback-link`,
    CALLBACK_WINDOW: `.modal-window`,
    ACTIVE_CALLBACK_WINDOW: `modal-window--active`,
    CLOSE_BUTTON: `.modal-window__close-button`,
    MODAL_FORM: `.modal-window form`,
    SCROLL_LINKS: `.main-screen__scroll, .main-screen__link`,
    INPUT_NAME: `#username`,
  };

  const DEVICE_SIZE = 768;

  const ESC = `Escape`;

  const PHONE_INPUTS = [`phone`, `userphone`];

  const classListAdd = function (element, className) {
    element.classList.add(className);
  };

  const classListRemove = function (element, className) {
    element.classList.remove(className);
  };

  const toggleInfoBlock = function (selectorHeadline) {
    const headlineElements = Array.from(document.querySelectorAll(selectorHeadline));

    headlineElements.forEach(function(element) {
      classListAdd(element, ClassName.COLLAPSED_BLOCK);
      window.addEventListener(`resize`, function (evt) {
        const action = innerWidth < DEVICE_SIZE ? classListAdd : classListRemove;
        action(element, ClassName.COLLAPSED_BLOCK);
      });

      element.addEventListener(`click`, function () {
        if (innerWidth < DEVICE_SIZE) {
          let action = classListAdd;
          if (element.classList.contains(ClassName.COLLAPSED_BLOCK)) {
            headlineElements.forEach((elem) => {
              classListAdd(elem, ClassName.COLLAPSED_BLOCK);
            });
            action = classListRemove;
          }
          action(element, ClassName.COLLAPSED_BLOCK);
        }
      });
    });
  };

  const openModalWindow = function () {
    const callbackButton = document.querySelector(ClassName.CALLBACK_BUTTON);
    const callbackWindow = document.querySelector(ClassName.CALLBACK_WINDOW);

    if (callbackButton) {
      callbackButton.addEventListener(`click`, function (evt) {
        evt.preventDefault();
        if (callbackWindow) {
          classListAdd(document.body, ClassName.ACTIVE_CALLBACK_WINDOW);
          const username = document.querySelector(ClassName.INPUT_NAME);
          username.focus();
        }
      });
    }

    window.addEventListener(`keydown`, function (evt) {
      if (evt.key === ESC) {
        classListRemove(document.body, ClassName.ACTIVE_CALLBACK_WINDOW);
      }
    });
  };

  const closeModalWindow = function () {
    const closeButton = document.querySelector(ClassName.CLOSE_BUTTON);
    const callbackWindow = document.querySelector(ClassName.CALLBACK_WINDOW);
    if (closeButton) {
      closeButton.addEventListener(`click`, function () {
        classListRemove(document.body, ClassName.ACTIVE_CALLBACK_WINDOW);
      });
    }

    if (callbackWindow) {
      callbackWindow.addEventListener(`click`, function (evt) {
        if (evt.target.closest(ClassName.MODAL_FORM) === null) {
          classListRemove(document.body, ClassName.ACTIVE_CALLBACK_WINDOW);
        }
      });
    }
  };

  const setScrollLinkSmooth = function (evt) {
    evt.preventDefault();
    const anchor = evt.target.closest(`[href]`).href.split(`#`);
    document.querySelector(`#` + anchor[1]).scrollIntoView({
      behavior: 'smooth'
    });
  };

  const smoothScroll = function (linkSelector) {
    const scrollLinks = Array.from(document.querySelectorAll(linkSelector));
    scrollLinks.forEach(function (element) {
      element.addEventListener(`click`, setScrollLinkSmooth);
    });
  };

  PHONE_INPUTS.forEach(function (input) {
    IMask(document.getElementById(input), {
        mask: `+{7}(000)000-00-00`
      });
  });

  openModalWindow();
  closeModalWindow();
  smoothScroll(ClassName.SCROLL_LINKS);

  toggleInfoBlock(ClassName.INFO_MENU_HEADLINE);
})();
