$(function(){

  //ハンバーガーメニュー
  //--------------------------------------------
  /*
  【ハンバーガーメニューScriptの改修について】
  １．メニューの開閉判定にclassを使っていたものを、ボタンに設定されたaria-expandedの値を使用するように変更しています。hasClass()の値はboolean値ですが、attr('aria-expanded')の値は文字列としての'true','false'が入ってくるので、if文の評価式を文字列判定に変更する必要があるところがハマりどころです。
  ２．if文の中では.is-openを付け外ししていたものを、必要なariaの値の付け替えに変更しているだけで、基本的なロジックは対策前と同じです。
  ３．今回のサンプルではグローバルナビのソースをPC/SPで共有しているため、ブレイクポイントをまたいでUIが変化した際にaria-hiddenの値を付け替えたり、スマホ用UIレイアウトの初期化をする処理も加えています。
  */
  
  //ハンバーガーボタンを $triggerに格納
  const $trigger = $('#hamburger');
  //グロナビを $gnavに格納
  const $gnav = $('#gnav');
  //ヘッダーのブレイクポイントを point_headerに格納
  const point_header = window.matchMedia('screen and (min-width: 992px)');

  //ハンバーガーメニューボタンがクリックされた時
  $trigger.on('click',function(){
    //aria-expandedの値を変数expandedに格納
    const expanded = $(this).attr('aria-expanded');

    //もし expanded が 'false'だったら（メニューが非表示・開く操作）
    //【重要】ariaの値はbooleanではなく文字列なので評価式の記述が変わります
    if(expanded === 'false'){ 
      //対象メニューの展開ステートをtrueにし、labelを「閉じる」に変更
      $(this).attr('aria-expanded',true).attr('aria-label','メニューを閉じる');
      //メニューのhiddenステートをfalseにしてメニューを表示
      $gnav.attr('aria-hidden',false).slideDown();

    //もし expanded が 'true'だったら（メニューが展開済・閉じる操作）
    }else {
      //対象メニューの展開ステートをfalseにし、labelを「開く」に変更
      $(this).attr('aria-expanded',false).attr('aria-label','メニューを開く');
      //メニューのhiddenステートをtrueにしてメニューを閉じる
      $gnav.attr('aria-hidden',true).slideUp();
    }
  });

  //ブレイクポイントをまたいだときの挙動
  //今回のグロナビはPC/SPソース共有なので、ブレイクポイントをまたいだ時にaria属性も動的に設定する必要がある。ハンバーガーはSPレイアウト時しか表示されないので992px以上の場合の処理は不要
  function checkBreakPoint() {
    //もし992px以上だったら
    if (point_header.matches) {
      //グロナビを表示
      $gnav.attr('aria-hidden',false).show(); 
    }else {
      //スマホレイアウトの初期状態にリセット
      $trigger.attr('aria-expanded',false).attr('aria-label','メニューを開く');
      $gnav.attr('aria-hidden',true).hide(); 
    }
  }
  point_header.addListener(checkBreakPoint);
  

  //法人/個人別
  //--------------------------------------------

  $('input[name="attribute"]').on('change',function(){
    const attribute = $('input[name="attribute"]:checked').val();

    if(attribute === '個人') {
      $('#company').prop('required', false);
    }else {
      $('#company').prop('required', true);
    }
  });

  //簡易バリデーション
  //--------------------------------------------

  $('input,textarea,select').each(function(){

    $(this).on('change',function(){

      if($(this).is(':invalid')) {
        $(this).parents('.inputField').addClass('is-error');
        //そのフォームのエラーメッセージをスクリーンリーダー向けに表示
        $(this).parents('.inputField').find('.errorText').attr('aria-hidden',false);

      }else {
        $(this).parents('.inputField').removeClass('is-error');
        //エラーメッセージをスクリーンリーダーから隠す
        $(this).parents('.inputField').find('.errorText').attr('aria-hidden',true);
      }
    });
  });

  $('#submit').on('click',function(){
    $('input,textarea,select').each(function(){
      if($(this).is(':invalid')) {
        $(this).parents('.inputField').addClass('is-error');
        //そのフォームのエラーメッセージをスクリーンリーダー向けに表示
        $(this).parents('.inputField').find('.errorText').attr('aria-hidden',false);
      }else {
        $(this).parents('.inputField').removeClass('is-error');
        //エラーメッセージをスクリーンリーダーから隠す
        $(this).parents('.inputField').find('.errorText').attr('aria-hidden',true);
      }
    });
  });


  //個人情報保護方針同意
  //--------------------------------------------

  $('#agree').on('click',function(){

    if($(this).prop('checked')){
      $('#submit').prop('disabled', false);
    }else{
      $('#submit').prop('disabled', true);
    }
  });

});