$(function(){
  /*
  【Sriptについて】
  ハンバーガーメニュー、バリデーションともに最低限の簡易的な実装となっています。
  JSによるaria属性の付替え作業をイメージしやすくするためのコードであり、
  実務的には機能不足の部分もあることをご了承下さい。

  ◎JSが得意な方は下記コードは破棄してご自身で納得の行くコードを書いてみてください。
  ◎JSが苦手な方はchapter3の解説を参考にして、
  　・if文の条件としてaria属性の値を参照する
  　・aria属性の値（true/false）を付け替える記述を追加する
  にチャレンジしてみてください。
  ◎JSが全く分からない方はariaの付け替え部分については無理にやらなくても構いません。
  ただし、状態変化を自身で設定できないのであれば静的なHTMLにもaria-*のステートを
  設定すべきではないので、無理に動的なWAI-ARIAを使おうとせず、
　ネイティブのHTMLとして正しいセマンティクスでマークアップすることを心がけて下さい。
  */
  
  //ハンバーガーメニュー
  //--------------------------------------------

  //ハンバーガーメニューボタンがクリックされた時
  $('.hamburger').on('click',function(){
    //"is-open" classがついているかどうかのboolean値を expanded に格納
    const expanded = $(this).hasClass('is-open');
    //メニューのDOMを$gnavに格納
    const $gnav = $('#gnav');

    //もし expanded が falseだったら（メニューが非表示）
    if(!expanded){
      $(this).addClass('is-open'); //'is-open' classを追加
      $gnav.slideDown(); //メニューを表示
    //もし expanded が trueだったら（メニューが展開済）
    }else {
      $(this).removeClass('is-open'); //'is-open' classを削除
      $gnav.slideUp(); //メニューを非表示
    }
  });
  

  //法人/個人別
  //--------------------------------------------

  //name属性が'attribute'（法人／個人）の値が変化したら
  $('input[name="attribute"]').on('change',function(){
    //選択された方の値を変数attributeに格納
    const attribute = $('input[name="attribute"]:checked').val();

    //もし個人だったら
    if(attribute === '個人') {
      //会社名のフォームを任意にする
      $('#company').prop('required', false);
    //もし個人でなかったら
    }else {
      //会社名のフォームを必須にする
      $('#company').prop('required', true);
    }
  });

  //簡易バリデーション
  //--------------------------------------------

  //入力時に簡易バリデーションを実施
  $('input,textarea,select').each(function(){
    //値が変わったら実行
    $(this).on('change',function(){
      //不正な値だったら
      if($(this).is(':invalid')) {
        //親の.inputField要素にエラー用classを追加（エラースタイルに変更＆固定エラー文言の表示）
        $(this).parents('.inputField').addClass('is-error');
      //不正な値ではなかったら
      }else {
        //エラー用classを削除
        $(this).parents('.inputField').removeClass('is-error');
      }
    });
  });
  //送信ボタン時に再チェック
  $('#submit').on('click',function(){
    $('input,textarea,select').each(function(){
      if($(this).is(':invalid')) {
        $(this).parents('.inputField').addClass('is-error');
      }else {
        $(this).parents('.inputField').removeClass('is-error');
      }
    });
  });


  //個人情報保護方針同意
  //--------------------------------------------

  //個人情報に同意するチェックボックスが押されたら
  $('#agree').on('click',function(){

    //チェックされていたら
    if($(this).prop('checked')){
      //送信ボタンのdisabled属性を削除
      $('#submit').prop('disabled', false);
    //チェックされていなかったら
    }else{
      //送信ボタンをdisabled属性を追加
      $('#submit').prop('disabled', true);
    }
  });

});