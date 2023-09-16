  // hide and show middle right bottom 


  document.querySelector('#buttonFirst').addEventListener('click', showTabOne);
  document.querySelector('#buttonSecond').addEventListener('click', showTabTwo);
  document.querySelector('#buttonThird').addEventListener('click', showTabThird);

  function showTabOne(){
      let tab1 =  document.getElementById('firstTab');

      if(tab1.style.display  == 'none'){
        document.querySelector('#buttonFirst').children[0].setAttribute('class', 'fa fa-angle-up');
        document.getElementById('firstTab').style.display = 'block';
          document.getElementById('secondTab').style.display = 'none';
          document.getElementById('thirdTab').style.display = 'none';

      }else{
        document.getElementById('firstTab').style.display = 'none';
        document.getElementById('secondTab').style.display = 'none';
        document.getElementById('thirdTab').style.display = 'none';
        document.querySelector('#buttonFirst').children[0].setAttribute('class', 'fa fa-angle-down');
      document.querySelector('#buttonSecond').children[0].setAttribute('class', 'fa fa-angle-down');
      document.querySelector('#buttonThird').children[0].setAttribute('class', 'fa fa-angle-down');



      }
  }
  function showTabTwo(){
    let tab1 =  document.getElementById('secondTab');

    if(tab1.style.display  == 'none'){
        document.querySelector('#buttonSecond').children[0].setAttribute('class', 'fa fa-angle-up');
      document.getElementById('firstTab').style.display = 'none';
        document.getElementById('secondTab').style.display = 'block';
        document.getElementById('thirdTab').style.display = 'none';

    }else{
      document.getElementById('firstTab').style.display = 'none';
      document.getElementById('secondTab').style.display = 'none';
      document.getElementById('thirdTab').style.display = 'none';
      document.querySelector('#buttonFirst').children[0].setAttribute('class', 'fa fa-angle-down');
      document.querySelector('#buttonSecond').children[0].setAttribute('class', 'fa fa-angle-down');
      document.querySelector('#buttonThird').children[0].setAttribute('class', 'fa fa-angle-down');

    }
}
function showTabThird(){
    let tab1 =  document.getElementById('thirdTab');

    if(tab1.style.display  == 'none'){
        document.querySelector('#buttonThird').children[0].setAttribute('class', 'fa fa-angle-up');
        document.getElementById('firstTab').style.display = 'none';
        document.getElementById('secondTab').style.display = 'none';
        document.getElementById('thirdTab').style.display = 'block';

    }else{
      document.getElementById('firstTab').style.display = 'none';
      document.getElementById('secondTab').style.display = 'none';
      document.getElementById('thirdTab').style.display = 'none';
      document.querySelector('#buttonFirst').children[0].setAttribute('class', 'fa fa-angle-down');
      document.querySelector('#buttonSecond').children[0].setAttribute('class', 'fa fa-angle-down');
      document.querySelector('#buttonThird').children[0].setAttribute('class', 'fa fa-angle-down');

    }
}