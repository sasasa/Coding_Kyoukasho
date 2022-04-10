$(function(){

  //ハンバーガーメニュー
  //--------------------------------------------

  //ハンバーガーボタンを $triggerに格納
  const $trigger = $('#hamburger');
  //ハンバーガーボタンのテキストを $btnTxtに格納
  const $btnTxt = $('.hamburger__txt');
  //SPメニュー $navに格納
  const $nav = $('#spmenu');
  //ヘッダーのブレイクポイントを point_headerに格納
  const point_header = window.matchMedia('screen and (min-width: 768px)');

  //ハンバーガーメニューボタンがクリックされた時
  $trigger.on('click',function(){
    const expanded = $(this).attr('aria-expanded');
    if(expanded === 'false'){ 
      openMenu();
    }else {
      closeMenu();
    }
  });

  function openMenu() { //メニューを開く操作
    $trigger.attr('aria-expanded',true).attr('aria-label','メニューを閉じる');
    $btnTxt.text('Close');
    $nav.attr('aria-hidden',false).fadeIn();
  }
  function closeMenu() { //メニューを閉じる操作
    $trigger.attr('aria-expanded',false).attr('aria-label','メニューを開く');
    $btnTxt.text('Menu');
    $nav.attr('aria-hidden',true).fadeOut();
  }

  // //ブレイクポイントをまたいだときの挙動
  function checkBreakPoint() {
    if (point_header.matches) {
      closeMenu(); //ハンバーガーメニューをリセット
    }
  }
  point_header.addListener(checkBreakPoint);
  

  //簡易バリデーション
  //--------------------------------------------

  $('input,textarea,select').each(function(){

    $(this).on('change',function(){

      if($(this).is(':invalid')) {
        $(this).parents('.input-field').addClass('is-error');
        //そのフォームのエラーメッセージをスクリーンリーダー向けに表示
        $(this).parents('.input-field').find('.error-text').attr('aria-hidden',false);

      }else {
        $(this).parents('.input-field').removeClass('is-error');
        //エラーメッセージをスクリーンリーダーから隠す
        $(this).parents('.input-field').find('.error-text').attr('aria-hidden',true);
      }
    });
  });

  $('#submit').on('click',function(){
    $('input,textarea,select').each(function(){
      if($(this).is(':invalid')) {
        $(this).parents('.input-field').addClass('is-error');
        //そのフォームのエラーメッセージをスクリーンリーダー向けに表示
        $(this).parents('.input-field').find('.error-text').attr('aria-hidden',false);
      }else {
        $(this).parents('.input-field').removeClass('is-error');
        //エラーメッセージをスクリーンリーダーから隠す
        $(this).parents('.input-field').find('.error-text').attr('aria-hidden',true);
      }
    });
  });

  // タブ
  //--------------------------------------------
  //ariaを利用した汎用的に使えるタブ用スクリプトにしてあります。
  function tab() {
    const $tab = $('[aria-controls^="panel"]');

    $tab.on('click',function(e){
      const $self = $(e.currentTarget);
      const expanded = $self.attr('aria-expanded');
      const target = $self.attr('aria-controls');
      const $target = $('#' + target);
  
      if (expanded === 'false') {
        $tab.attr('aria-expanded', false).attr('aria-selected', false);
        $tab.filter('[aria-controls="'+ target +'"]').attr('aria-expanded', true).attr('aria-selected',true);
        $target.attr('aria-hidden', false).siblings('[id]').attr('aria-hidden', true);
      }

      return false;
    });
  }
  tab();


  // アコーディオン
  //--------------------------------------------
  //ariaを利用した汎用的に使えるアコーディオン用スクリプトにしてあります。
  function accordion(){
    $('[aria-controls^="accordion"]').stop().on('click',function(e){
      const $self = $(e.currentTarget);
      const expanded = $self.attr('aria-expanded');
      const $target = $('#' + $self.attr('aria-controls'));

      if (expanded === 'false') {
        $self.attr('aria-expanded', true);
        $target.attr('aria-hidden', false).slideDown();
      } else {
        $self.attr('aria-expanded', false);
        $target.attr('aria-hidden', true).slideUp();
      }
    });
  }
  accordion();

});