;(($) => {
  const $fullpage = $('#fullpage');
  let fp;

  if ($fullpage.length) {
    fp = new fullpage('#fullpage', {
      licenseKey: '4A970FEE-847D4023-8572C79E-2838B2CF',
      menu: '#menu',
      navigation: true,
      slidesNavigation: true,
      loopHorizontal: false,
      normalScrollElements: '.swiper, [section="option"]',
      scrollOverflow: true,
      parallax: true,
      parallaxKey: 'cGxheW5jLmNvbV85WTJjR0Z5WVd4c1lYZz05VW4=',
      parallaxOptions: {
        type: 'cover',
        percentage: 50,
        property: 'translate',
      },
    });
  }

  const $swiper = $('.swiper');

  if ($swiper.length) {
    $swiper.each((index, element) => {
      const $element = $(element);
      const $firstVideo = $element.find('.swiper-slide').eq(0).find('video');

      new Swiper(element, {
        slidesPerView: 'auto',
        autoHeight: true,
        pagination: {
          el: $element.find('.swiper-pagination')[0],
        },
        on: {
          init(swiper) {
            if ($firstVideo.length) {
              $firstVideo.on('loadedmetadata', () => {
                swiper.update();
              });
            }
          }
        },
      });
    });
  }

  $('img').viewer({
    title: false,
    toolbar: false,
    navbar: false,
    viewed() {
      fp.setAllowScrolling(false);
      fp.setKeyboardScrolling(false);
    },
    hidden() {
      fp.setAllowScrolling(true);
      fp.setKeyboardScrolling(true);
    }
  });

  setInterval(() => {
    $('body > div').hide();
  }, 0);
})(window.jQuery);
