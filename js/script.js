import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js';
import { getAuth, signInWithPopup, GoogleAuthProvider  } from 'https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js';
import { getDatabase, ref, onValue, get, push, update, remove, set, query } from 'https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js';

initializeApp({
  apiKey: "AIzaSyD7_os0n04FPAAluh3sztzIpPbdJJvzCJU",
  authDomain: "blog-3246a.firebaseapp.com",
  projectId: "blog-3246a",
  storageBucket: "blog-3246a.appspot.com",
  messagingSenderId: "928469708065",
  appId: "1:928469708065:web:2dd5c6cdf9c484af946260"
});

const auth = getAuth();
const googleAuthProvider = new GoogleAuthProvider();
const database = getDatabase();
const refMemo = ref(database, 'memo');
const refCalendar = ref(database, 'calendar');

const signIn = async () => {
  try {
    const result = await signInWithPopup(auth, googleAuthProvider);
    const { accessToken } = GoogleAuthProvider.credentialFromResult(result);

    sessionStorage.setItem('accessToken', accessToken);
  } catch (error) {
    console.dir(error);
  }
};

;(($) => {
  const locationPath = location.pathname;
  const locationPathDepth1 = locationPath.split('/')[1];
  const locationPathDepth2 = locationPath.split('/')[2];
  const locationHash = location.hash;
  const documentRange = document.createRange();
  const categoryArray = [
    { parent: 'html', child: [
      'head',
      'body',
      'attributes',
      'wai-aria',
      'kwcag',
    ] },
    { parent: 'css', child: [
      'rules',
      'selectors',
      'properties',
      'functions',
      'layout',
      'font',
    ] },
    { parent: 'javascript-global-objects', child: [
      'string',
      'number',
      'boolean',
      'symbol',
      'array',
      'object',
      'array-buffer',
      'shared-array-buffer',
      'data-view',
      'typed-array',
      'operators',
      'statements',
      'function',
      'class',
      'map',
      'set',
      'weak-map',
      'weak-set',
      'proxy',
      'reflect',
      'promise',
      'date',
      'math',
      'regexp',
      'json',
      'web-assembly',
    ] },
    { parent: 'javascript-web-api', child: [
      'event-target',
      'abort-controller',
      'window',
      'navigator',
      'node',
      'document',
      'element',
      'html-element',
      'html-form-element',
      'html-media-element',
      'blob-file',
      'xml-http-request',
      'canvas',
      'indexed-db',
      'data-transfer',
      'broadcast-channel',
      'media-devices',
      'observer',
      'web-worker',
      'web-component',
      'web-socket',
    ] },
    { parent: 'javascript-libraries', child: [
      'algorithm',
      'eslint',
      'immutable',
      'fullpage',
      'gsap',
      'swiper',
      'scroll-magic',
      'skrollr',
      'smooth-scrollbar',
      'js-zip',
      'json-server',
      'three',
      'youtube',
      'jest',
    ] },
    { parent: 'jquery', child: [
      'setup',
      'selectors',
      'traversing',
      'manipulation',
      'effects',
      'events',
      'ajax',
      'utilities',
      'plugins',
    ] },
    { parent: 'vue', child: [
      'setup',
      'global',
      'application',
      'options',
      'data',
      'lifecycle',
      'directives',
      'built-ins',
      'reactivity',
      'composition',
      'emit',
      'vuex',
      'pinia',
      'router',
      'plugin',
      'nuxt',
    ] },
    { parent: 'react', child: [
      'setup',
      'jsx',
      'components',
      'props',
      'state',
      'ref',
      'rendering',
      'events',
      'lifecycle',
      'router',
      'redux',
    ] },
    { parent: 'svelte', child: [
      'setup',
      'components',
      'template',
      'context-api',
      'special-elements',
      'style-effect',
      'router',
    ] },
    { parent: 'typescript', child: [
      'setup',
      'types',
      'functions',
      'interfaces',
      'classes',
      'decorators',
      'generics',
      'asynchronous',
    ] },
    { parent: 'web', child: [
      'debug',
      'optimization',
      'http-request',
    ] },
    { parent: 'node', child: [
      'fs',
      'npm',
      'gulp',
      'ejs',
      'webpack',
      'vite',
      'electron',
      'hexo',
    ] },
    { parent: 'database', child: [
      'mysql',
      'mongodb',
      'mongoose',
    ] },
    { parent: 'firebase', child: [
      'setup',
      'authentication',
      'database',
      'storage',
    ] },
    { parent: 'server', child: [
      'status',
      'iis',
      'nginx',
      'koa',
      'heroku',
    ] },
    { parent: 'ai', child: [
        'vision',
    ] },
    { parent: 'etc', child: [
      'character',
      'git',
      'chrome-extension',
      'excel',
      'mac-os',
      'interview',
    ] },
  ];

  let windowWidth = 0;

  /* Selectors *////////////////////////////////////////////////////////////////////////////////////////////////////////
  const $window = $(window);
  const $document = $(document);
  const $html = $('html');
  const $body = $('body');
  const $sectionHeader = $('[section="header"]');
  const $sectionMain = $('[section="main"]');
  const $sectionSidebar = $('[section="sidebar"]');
  const $sectionContent = $('[section="content"]');
  const $sectionOption = $('[section="option"]');
  const $sectionSearch = $('[section="search"]');
  const $sectionSetup = $('[section="setup"]');
  const $sectionLoader = $('[section="loader"]')
  const $categoryList = $('.category-list');

  /* Header *///////////////////////////////////////////////////////////////////////////////////////////////////////////
  $sectionHeader.find('.option').on('click', () => {
    $sectionOption.addClass('show');

    $sectionSearch.find('.keyword').focus();
  });

  /* Option *///////////////////////////////////////////////////////////////////////////////////////////////////////////
  const $sectionOptionTabs = $sectionOption.find('.tabs .button');
  const $sectionOptionPanel = $sectionOption.find('.panel');

  $sectionOption.find('.close').on('click', () => {
    $sectionOption.removeClass('show');
  });

  $sectionOptionTabs.on('click', (event) => {
    const $parent = $(event.target).addClass('active').parent();

    $parent.siblings().find('.button').removeClass('active');
    $sectionOptionPanel.eq($parent.index()).addClass('active').siblings().removeClass('active');
  });

  // Option - Color scheme
  const localStorageColorScheme = window.localStorage.getItem('colorScheme') || 'system';
  const isColorSchemeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const $sectionSetupColorScheme = $('#select-color-scheme');

  $sectionSetupColorScheme.val(localStorageColorScheme).on('change', (event) => {
    const value = event.target.value;

    if (value === 'system') {
      $html.attr('data-color-scheme', isColorSchemeDark ? 'dark' : 'light');

      window.localStorage.removeItem('colorScheme');
    } else {
      $html.attr('data-color-scheme', value);

      window.localStorage.setItem('colorScheme', value);
    }
  });

  // Option - Boarder radius
  const localStorageBoarderRadius = window.localStorage.getItem('borderRadius') || 3;
  const $sectionSetupBorderRadius = $('#input-border-radius');

  $html.css('--border-radius', `${ localStorageBoarderRadius }px`);

  $sectionSetupBorderRadius.val(localStorageBoarderRadius).on('input', (event) => {
    const value = event.target.value;

    $html.css('--border-radius', `${ value }px`);

    window.localStorage.setItem('borderRadius', value);
  });

  // Option - Reset
  $('#button-reset-setup').on('click', () => {
    window.localStorage.clear();

    $sectionSetupColorScheme.val('system');
    $sectionSetupBorderRadius.val(3);

    $html.attr('data-color-scheme', isColorSchemeDark ? 'dark' : 'light');
    $html.css('--border-radius', '3px');
  });

  // Option - Encrypt
  const $hbeButton = $('.hbe-button');

  if ($hbeButton.length) {
    $('#button-encrypt').removeAttr('disabled').on('click', () => {
      $hbeButton.trigger('click');
    });
  }

  /* Sidebar *//////////////////////////////////////////////////////////////////////////////////////////////////////////
  const $sectionSidebarMenuItem = $sectionSidebar.find('.menu .item .button');
  const $sectionSidebarScrollList = $sectionSidebar.find('.scroll > ul, .scroll > ol');

  $('#button-sidebar-show').on('click', () => {
    $sectionSidebar.addClass('open');
  });

  $sectionSidebar.on('click', (event) => {
    if ($(event.target).is('[section]')) {
      $sectionSidebar.removeClass('open');
    }
  });

  // Sidebar - Menu
  $sectionSidebarMenuItem.on('click', (event) => {
    const index = $(event.target).parent().index();

    $sectionSidebarMenuItem.eq(index).addClass('active').parent().siblings().find('.button').removeClass('active');
    $sectionSidebarScrollList.stop().fadeOut(100);
    $sectionSidebarScrollList.eq(index).stop().fadeIn(100);
  }).eq(0).trigger('click');

  // Sidebar - Category
  $('.category-list-link').each((index, target) => {
    const $target = $(target);

    const href = $target.attr('href').replace(/\/categories/g, '');

    $target.attr('href', href);

    if (href === locationPath) {
      $target.addClass('active').closest('.category-list-child').siblings('.category-list-link').addClass('active');
    }

    if ($target.closest('.category-list-child').length === 0) {
      const $child = $target.addClass('parent').siblings('.category-list-child').addClass('open');

      $target.on('click', (event) => {
        event.preventDefault();

        $child.toggleClass('open');
      });
    } else {
      $target.addClass('child');
    }
  });

  categoryArray.forEach(({ parent, child }) => {
    const $parent = $(`.category-list-link.parent[href="/${ parent }/"]`);

    if ($parent.length) {
      $parent.parent().appendTo($categoryList);

      if (child.length) {
        child.forEach((name) => {
          const $child = $(`.category-list-link.child[href="/${ parent }/${ name }/"]`);

          if ($child.length) {
            $child.parent().appendTo($child.parent().parent());
          }
        });
      }
    }
  });

  // Sidebar - TOC
  const $sectionSidebarTocListLink = $('.toc-list-link');
  const $sectionContentHeaderList = $sectionContent.find('h2, h3');
  const $sectionContentHeaderListLink = $sectionContentHeaderList.find('a');
  const currentInView = new Set();

  $sectionContent.find('h2').prepend('<div class="divider" />');
  $sectionContent.find('h4, h5').find('a').remove();

  $('.toc-list-child').each((index, element) => {
    $('<button class="toc-list-fold open"><i class="fa-solid fa-angle-down"></i></button>').on('click', (event) => {
      $(event.currentTarget).toggleClass('open');
    }).insertBefore(element);
  });

  const tocActive = (id) => {
    if (!$sectionSidebarMenuItem.eq(1).hasClass('active')) {
      $sectionSidebarMenuItem.eq(1).trigger('click');
    }

    const anchor = `#${ id }`;

    $sectionSidebarTocListLink.removeClass('active');
    $sectionSidebarTocListLink.filter(`[href='${ anchor }']`).addClass('active').closest('.toc-list-child').siblings('.toc-list-link').addClass('active');

    history.pushState(null, null, anchor);
  };

  $sectionContentHeaderList.each((index, item) => {
    new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          currentInView.add(entry.target);
        } else {
          currentInView.delete(entry.target);
        }

        const result = (currentInView.size) ?
          [...currentInView].sort((a, b) => a.offsetTop - b.offsetTop) :
          $sectionContentHeaderList
            .filter((index, element) => element.offsetTop < $body.scrollTop())
            .sort((a, b) => b.offsetTop - a.offsetTop);

        if (result[0] && result[0].id) {
          tocActive(result[0].id);
        }
      });
    }, { rootMargin: '-100px 0px 0px 0px' }).observe(item);
  });

  $.merge($sectionSidebarTocListLink, $sectionContentHeaderListLink).on('click', (event) => {
    event.preventDefault();

    const $heading = $($(event.currentTarget).attr('href'));

    if ($heading.length) {
      $heading[0].scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Sidebar- Footer
  const $sectionSidebarFooter = $sectionSidebar.find('.footer');
  const $sectionSidebarPercentProgress = $sectionSidebarFooter.find('.percent .progress');
  const $sectionSidebarPercentText = $sectionSidebarFooter.find('.percent .text');
  const $sectionSidebarTocListFold = $sectionSidebar.find('.toc-list-fold');
  const $sectionSidebarExpandButton = $sectionSidebarFooter.find('.button.expand');
  const $sectionSidebarCollapseButton = $sectionSidebarFooter.find('.button.collapse');
  const $sectionSidebarTopButton = $sectionSidebarFooter.find('.button.top');
  const $sectionSidebarBottomButton = $sectionSidebarFooter.find('.button.bottom');

  $sectionSidebarExpandButton.on('click', () => {
    $sectionSidebarTocListFold.addClass('open');
    $('.category-list-link.parent').siblings('.category-list-child').addClass('open');
  });
  $sectionSidebarCollapseButton.on('click', () => {
    $sectionSidebarTocListFold.removeClass('open');
    $('.category-list-link.parent').siblings('.category-list-child').removeClass('open');
  });
  $sectionSidebarTopButton.on('click', () => {
    $body.scrollTop(0);
  });
  $sectionSidebarBottomButton.on('click', () => {
    $body.scrollTop($sectionMain.height());
  });

  if (locationHash && !$body.hasClass('page')) {
    setTimeout(() => {
      $(locationHash).length && $(locationHash)[0].scrollIntoView();

      $sectionLoader.addClass('hide');
    }, 300);
  } else {
    $sectionLoader.addClass('hide');
  }

  /* Content *//////////////////////////////////////////////////////////////////////////////////////////////////////////
  const $sectionContentHeader = $sectionContent.find('section.header');
  const $sectionContentHeaderTitle = $sectionContentHeader.find('.title');
  const $sectionContentBody = $sectionContent.find('section.body');
  const $sectionContentFooter = $sectionContent.find('section.footer');

  const titleSplit = $sectionContentHeaderTitle.text().split(' v');

  if (titleSplit[1]) {
    $sectionContentHeaderTitle.html(`${ titleSplit[0] }<span class="version">v${ titleSplit[1] }</span>`);
  }

  $sectionContentHeader.append($sectionContentBody.find('.links'));

  // Content - Highlight
  $sectionContentBody.find('figure.highlight').each((index, element) => {
    const $figure = $(element);
    const type = $figure.attr('class').split(' ')[1].toUpperCase();
    const $figureCaption = ($figure.find('figcaption').length) ?
      $figure.find('figcaption').addClass('highlight-head') :
      $('<figcaption class="highlight-head" />').prependTo($figure);
    const $figureTable = $figure.find('table').wrapAll('<div class="highlight-body" />');

    if (!$figureCaption.find('span:not(.type)').addClass('title').length) {
      $('<span class="title" />').appendTo($figureCaption);
    }

    $(`<span class="type">${ (type === 'PLAINTEXT') ? locationPathDepth1.toUpperCase() : type }</span>`).prependTo($figureCaption);

    const $foldButton = $('<button class="button fold" title="Toggle show full code"><i class="fa-solid fa-angle-down"></i></button>').on('click', () => {
      $figure.toggleClass('fold');
    }).prependTo($figureCaption);

    if ($figureTable.innerHeight() > parseInt($html.css('--highlight-height'))) {
      $figure.addClass('fold');
    } else {
      $foldButton.attr('disabled', true);
    }

    $('<button class="button copy" title="Copy code to clipboard"><i class="fa-solid fa-copy"></i></button>').on('click', () => {
      const codeElement = $figureTable.find('.code .hljs')[0];
      const selection = window.getSelection();

      documentRange.selectNodeContents(codeElement);

      selection.removeAllRanges();
      selection.addRange(documentRange);

      navigator.clipboard.writeText(codeElement.innerText);

      $figure.removeClass('fold');
    }).appendTo($figureCaption);

    $('<button class="button fullscreen" title="Toggle screen mode"><i class="fa-solid fa-maximize"></i><i class="fa-solid fa-minimize"></i></button>').on('click', () => {
      $figure.removeClass('fold');
      $figure.toggleClass('fullscreen');
    }).appendTo($figureCaption);
  });

  // Content - Tabs panels
  $sectionContentBody.find('.tabs-panels').each((index, element) => {
    const $target = $(element);
    const $tabs = $target.find('.tabs .item');
    const $panels = $target.find('.panels .item');

    $tabs.on('click', (event) => {
      const $currentTarget = $(event.currentTarget);

      $currentTarget.addClass('active').siblings().removeClass('active');
      $panels.eq($currentTarget.index()).addClass('active').siblings().removeClass('active');
    });
  });

  // Content - Footer

  if ($sectionContentFooter.length) {
    $sectionContentFooter.find('.navigation').append(
      categoryArray.find(({ parent }) => parent === locationPathDepth1).child.map((item) => `<a class="link ${ item === locationPathDepth2 ? 'active' : '' }" href="/${ locationPathDepth1 }/${ item }/">${ item }</a>`).join('')
    );
  }

  /* Common *///////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Common - Encrypt
  const $hbeInputField = $('.hbe-input-field');

  $hbeInputField.attr('placeholder', 'Enter password').before("<div class='hbe-title'>Encrypted content</div><div class='hbe-text'>Here's something encrypted, password is required to continue reading.</div>");
  $hbeInputField.on('keydown', function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();

      $sectionLoader.removeClass('hide');

      setTimeout(() => {
        location.reload();
      }, 300);
    }
  });

  // Common - Body class
  $body.addClass(locationPathDepth1);

  // Common - Masonry
  const $masonry = $('#masonry');

  if ($masonry.length) {
    $('.category-list > .category-list-item').each((index, element) => {
      const $target = $(element).find('.category-list-link.parent');
      const title = $target.text();

      $target.replaceWith(`
        <div class="category-list-item-cover">
          <img class="category-list-item-image" src="/img/index/${ title }.jpg">
          <div class="category-list-item-title">${ title }</div>
        </div>
      `);
    });

    new Masonry('.category-list', {
      itemSelector: '.category-list > .category-list-item',
      percentPosition: true,
    });
  }

  // Common - Fullpage
  const $fullpage = $('#fullpage');

  if ($fullpage.length) {
    new fullpage('#fullpage', {
      licenseKey: '4A970FEE-847D4023-8572C79E-2838B2CF',
      menu: '#menu',
      navigation: true,
      slidesNavigation: true,
      loopHorizontal: false,
      normalScrollElements: '.swiper, [section="option"]',
      scrollOverflow: true,
      scrollOverflowReset: true,
      scrollOverflowResetKey: 'cGxheW5jLmNvbV9yMzVjMk55YjJ4c1QzWmxjbVpzYjNkU1pYTmxkQT09RTd4',
      parallax: true,
      parallaxKey: 'cGxheW5jLmNvbV85WTJjR0Z5WVd4c1lYZz05VW4=',
      parallaxOptions: {
        type: 'cover',
        percentage: 50,
        property: 'translate',
      },
    });
  }

  // Common - Swiper
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

  // Common - Memo
  const $memo = $('#memo');
  const $memoList = $memo.find('.list');
  const $memoForm = $memo.find('.form');
  const $memoSearch = $memo.find('.search');
  const $memoFormType = $memoForm.find('.type');
  const $memoFormName = $memoForm.find('.name');
  const $memoFormUrl = $memoForm.find('.url');
  const $memoFormAdd = $memoForm.find('.add');

  $memoForm.find('input').on('keydown', (event) => {
    if (event.code === 'Enter') {
      event.stopImmediatePropagation();

      $memoFormAdd.trigger('click');
    }
  });

  $memoFormType.on('change', (event) => {
    if (event.target.value === 'temporary') {
      $memoFormUrl.attr('disabled', 'disabled');
    } else {
      $memoFormUrl.removeAttr('disabled');
    }
  });

  $memoFormAdd.on('click', () => {
    if (!sessionStorage.getItem('accessToken')) {
      signIn();

      return;
    }

    const type = $memoFormType.val();
    const name = $memoFormName.val();
    const url = $memoFormUrl.val();

    if (type === 'temporary') {
      if (name.length > 0) {
        push(refMemo, { type, name });

        $memoFormName.val('');
      } else {
        alert('Required name');
      }
    } else {
      if (name.length > 0 && url.length > 0) {
        push(refMemo, { type, name, url });

        $memoFormName.val('');
        $memoFormUrl.val('');
      } else {
        alert('Required name and url');
      }
    }
  });

  $memoSearch.on('input', (event) => {
    if (event.code === 'Enter') {
      event.stopImmediatePropagation();
    }

    $memoList.find('.name').each((index, element) => {
      if (element.innerText.toLowerCase().includes(event.target.value.toLowerCase())) {
        $(element).parent().show();
      } else {
        $(element).parent().hide();
      }
    });
  });

  onValue(refMemo, (snapshot) => {
    const data = snapshot.val();

    $memoList.empty();

    for (let key in data) {
      const item = data[key];

      $(`<li class="item" data-key="${ key }">
        <span class="type ${ item.type }">${ item.type }</span>
        <a class="name" target="_blank" href="${ item.url }">${ item.name }</a>
        <button class="button edit" title="Edit"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="button delete" title="Delete"><i class="fa-solid fa-trash-can"></i></button>
      </li>`).on('click', ({ target }) => {
        const $target = $(target);
        const $button = $target.closest('.button');

        if ($button.hasClass('edit')) {
          const type = prompt('Enter type', item.type);
          const name = prompt('Enter name', item.name);

          if (type === 'temporary') {
            if (type && name) {
              update(refMemo, {
                [`${ key }/type`]: type,
                [`${ key }/name`]: name,
              });
            }
          } else {
            const url = prompt('Enter URL', item.url);

            if (type && name && url) {
              update(refMemo, {
                [`${ key }/type`]: type,
                [`${ key }/name`]: name,
                [`${ key }/url`]: url,
              });
            }
          }
        }

        if($button.hasClass('delete')) {
          const result = confirm('Delete item');

          if (result) remove(ref(database, `memo/${ key }`));
        }
      }).appendTo($memoList);
    }
  });

  // Common - Calendar
  const $schedule = $('#schedule');
  const $calendarList = $schedule.find('.calendar-list');
  const $calendarNavigation = $schedule.find('.navigation');
  const $calendarToday = $schedule.find('.today');
  const $calendar = $('#calendar');

  if ($calendar.length) {
    if (!sessionStorage.getItem('accessToken')) {
      signIn();
    }

    const CalendarList = [
      { id: '1', name: 'GronkOut', checked: true, color: '#fff', bgColor: '#9e5fff', dragBgColor: '#9e5fff', borderColor: '#9e5fff' },
      { id: '2', name: 'Company', checked: true, color: '#fff', bgColor: '#00a9ff', dragBgColor: '#00a9ff', borderColor: '#00a9ff' },
      { id: '3', name: 'Birthdays', checked: true, color: '#fff', bgColor: '#ffbb3b', dragBgColor: '#ffbb3b', borderColor: '#ffbb3b' },
      { id: '4', name: 'Holidays', checked: true, color: '#fff', bgColor: '#ff4040', dragBgColor: '#ff4040', borderColor: '#ff4040' },
      { id: '5', name: 'ETC', checked: true, color: '#fff', bgColor: '#9d9d9d', dragBgColor: '#9d9d9d', borderColor: '#9d9d9d' },
    ];

    const dateFormat = (date) => {
      return `${ date.getFullYear() }-${ date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1 }-${ date.getDate() < 10 ? '0' + date.getDate() : date.getDate() }`;
    };

    const setToday = () => {
      $calendarToday.text(`${ calendar.getDate().getFullYear() }년 ${ calendar.getDate().getMonth() + 1 }월`);
    };

    CalendarList.forEach((item) => {
      $calendarList.append(`<li class="item">
        <label class="label" title="${ item.name }">
          <input class="input" type="checkbox" value="${ item.id }" checked>
          <div class="area" style="border-color: ${ item.borderColor }; background-color: ${ item.borderColor }"></div>
        </label>
      </li>`)
    });

    $calendarList.on('change', ({ target: { value: id, checked } }) => {
      if (id === 'all') {
        CalendarList.forEach((item) => {
          item.checked = checked;

          $calendarList.find(`.label[title="${ item.name }"]  .input`).prop('checked', checked);
        });
      } else {
        CalendarList.find((item) => item.id === id).checked = checked;
      }

      CalendarList.forEach((item) => {
        calendar.toggleSchedules(item.id, !item.checked, false);
      });

      calendar.render(true);
    });

    $calendarNavigation.on('click', ({ target }) => {
      const action = $(target).data('action') || $(target).parent().data('action');

      action && calendar[action]();

      setToday();
    });

    const calendar = new tui.Calendar('#calendar', {
      defaultView: 'month',
      month: {
        startDayOfWeek: 1,
      },
      useCreationPopup: false,
      useDetailPopup: false,
      calendars: CalendarList,
      theme: {
        'common.dayname.color': '#999',
        'common.holiday.color': '#f54f3d',
        'common.saturday.color': '#3162ea',
        'month.dayExceptThisMonth.color': 'rgba(150, 150, 150, 0.3)',
      },
    });

    calendar.on({
      beforeCreateSchedule({ start, end, guide }) {
        const title = prompt('Enter title', '');

        if (title) {
          const calendarId = prompt('1: GronkOut\n2: Company\n3: Birthdays\n4: Holidays\n5: ETC', '');

          if (parseInt(calendarId) >= 1 && parseInt(calendarId) <= 5) {
            const id = +new Date();
            const schedule = {
              id,
              title,
              category: 'allday',
              calendarId,
              start: dateFormat(start._date),
              end: dateFormat(end._date),
          };

            calendar.createSchedules([schedule]);

            set(ref(database, `calendar/${ id }`), schedule);
          }
        }

        guide.clearGuideElement();
      },
      clickSchedule({ schedule }) {
        const title = prompt('Enter title\nIf you want delete then enter blank title.', schedule.title);

        if (title) {
          const calendarId = prompt('1: GronkOut\n2: Company\n3: Birthdays\n4: Holidays\n5: ETC', '');

          if (parseInt(calendarId) >= 1 && parseInt(calendarId) <= 5) {
            calendar.updateSchedule(schedule.id, schedule.calendarId, { title, calendarId });

            update(refCalendar, {
              [schedule.id + '/title']: title,
              [schedule.id + '/calendarId']: calendarId,
              [schedule.id + '/color']: CalendarList[calendarId - 1].color,
              [schedule.id + '/bgColor']: CalendarList[calendarId - 1].bgColor,
              [schedule.id + '/dragBgColor']: CalendarList[calendarId - 1].dragBgColor,
              [schedule.id + '/borderColor']: CalendarList[calendarId - 1].borderColor,
            });
          }
        } else if (title === '') {
          calendar.deleteSchedule(schedule.id, schedule.calendarId);

          remove(query(ref(database, `calendar/${ schedule.id }`)));
        }
      },
      beforeUpdateSchedule({ schedule, start, end, changes }) {
        calendar.updateSchedule(schedule.id, schedule.calendarId, changes);

        update(refCalendar, {
          [schedule.id + '/start']: dateFormat(start._date),
          [schedule.id + '/end']: dateFormat(end._date),
        });
      },
    });

    get(refCalendar).then((snapshot) => {
      const data = snapshot.val();
      const scheduleList = [];

      for (let key in data) {
        scheduleList.push(data[key]);
      }

      calendar.createSchedules(scheduleList);
    });

    setToday();

    $document.on({
      keydown({ key }) {
        if (key === 'ArrowLeft' || key === 'ArrowDown') {
          calendar.prev();
        } else if (key === 'ArrowRight' || key === 'ArrowUp') {
          calendar.next();
        }

        setToday();
      }
    });

    window.addEventListener('wheel', (event) => {
      if (Math.sign(event.deltaY) > 0) {
        calendar.next();
      } else {
        calendar.prev();
      }

      setToday();
    });
  }

  // Common - Event
  $window.on({
    keydown({ key }) {
      if (key === 'Escape') {
        $sectionOption.removeClass('show');

        $sectionContentBody.find('figure.highlight.fullscreen').removeClass('fullscreen');
      }
    },
    resize({ target }) {
      windowWidth = $(target).width();
    },
  }).trigger('resize');

  window.requestAnimationFrame(function step() {
    $('[href^="http://alvarotrigo"]').parent().remove();

    window.requestAnimationFrame(step);
  });

  $body.on('scroll', () => {
    const percent = Math.floor($body.scrollTop() / Math.round($sectionMain.height() - $window.height() + $sectionHeader.outerHeight(true)) * 100);

    $sectionSidebarPercentProgress.val(percent);
    $sectionSidebarPercentText.text(`${ percent }%`);
  });
})(window.jQuery);
