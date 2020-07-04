const ClassName = {
  INFO_MENU: `.info-menu`,
  INFO_MENU_HEADLINE: `.info-menu__headline`,
  INFO_MENU_LIST: `.info-menu__list`,
  COLLAPSED_BLOCK: `info-menu--collapsed`,
  CALLBACK_BUTTON: `.header__callback-button`,
  CALLBACK_WINDOW: `.modal-window`,
  ACTIVE_CALLBACK_WINDOW: `modal-window--active`,
  CLOSE_BUTTON: `.modal-window__close-button`,

};

const DEVICE_SIZE = 768;

(function () {
  const hideElement = (element) => {
    element.classList.add(ClassName.COLLAPSED_BLOCK);
  };

  const showElement = (element) => {
    element.classList.remove(ClassName.COLLAPSED_BLOCK);
  };

  const toggleInfoBlock = function (selectorHeadline) {
    const element = selectorHeadline.closest(ClassName.INFO_MENU);
    if (!(selectorHeadline && element)) {
      return;
    }
    window.addEventListener(`resize`, function (evt) {
      if (innerWidth <= DEVICE_SIZE) {
        hideElement(element);
      } else {
        showElement(element);
      }
    });

    selectorHeadline.addEventListener(`click`, function () {
      if (innerWidth <= DEVICE_SIZE) {
        if (element.classList.contains(ClassName.COLLAPSED_BLOCK)) {
          showElement(element);
        } else {
          hideElement(element);
        }
      }
    });
  };

  const openModalWindow = function () {
    const callbackButton = document.querySelector(ClassName.CALLBACK_BUTTON);
    const callbackWindow = document.querySelector(ClassName.CALLBACK_WINDOW);

    if (callbackButton) {
      console.log(222);
      callbackButton.addEventListener(`click`, function () {
        if (callbackWindow) {
          callbackWindow.classList.add(ClassName.ACTIVE_CALLBACK_WINDOW)
        }
      });
    }

    window.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Escape`) {
        const callbackWindow = document.querySelector(ClassName.CALLBACK_WINDOW);
        callbackWindow.classList.remove(ClassName.ACTIVE_CALLBACK_WINDOW)
      }
    })
  };

  const closeModalWindow = function () {
    const closeButton = document.querySelector(ClassName.CLOSE_BUTTON);
    const callbackWindow = document.querySelector(ClassName.CALLBACK_WINDOW);
    if (closeButton) {
      console.log(555);
      closeButton.addEventListener(`click`, function () {
        callbackWindow.classList.remove(ClassName.ACTIVE_CALLBACK_WINDOW)
      });
    }

    if (callbackWindow) {
      callbackWindow.addEventListener(`click`, function (evt) {
        console.log(evt.target);
        if (evt.target.closest(`.modal-window__form`) === null) {
          callbackWindow.classList.remove(ClassName.ACTIVE_CALLBACK_WINDOW);
        }
      });
    }

  };

  openModalWindow();
  closeModalWindow();

  Array.from(document.querySelectorAll(ClassName.INFO_MENU_HEADLINE)).forEach(function(selectorHeadline) {
    toggleInfoBlock(selectorHeadline);
  });
})();
