function Calendar(id, year, month) {
    var Dlast = new Date(year,month+1,0).getDate(),
        D = new Date(year,month,Dlast),
        DNlast = new Date(D.getFullYear(),D.getMonth(),Dlast).getDay(),
        DNfirst = new Date(D.getFullYear(),D.getMonth(),1).getDay(),
        calendar = '<tr>',
        month=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];

    if (DNfirst != 0)
      for(var  i = 1; i < DNfirst; i++) calendar += '<td>';
    else
      for(var  i = 0; i < 6; i++) calendar += '<td>';
    
    for(var  i = 1; i <= Dlast; i++) {
      if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth())
        calendar += '<td class="today">' + i;
      else
        calendar += '<td>' + i;
      
      if (new Date(D.getFullYear(),D.getMonth(),i).getDay() == 0)
        calendar += '<tr>';
    }
    for(var  i = DNlast; i < 7; i++) calendar += '<td>&nbsp;';
    document.querySelector('#'+id+' tbody').innerHTML = calendar;
    document.querySelector('#'+id+' thead td:nth-child(2)').innerHTML = month[D.getMonth()] +' '+ D.getFullYear();
    document.querySelector('#'+id+' thead td:nth-child(2)').dataset.month = D.getMonth();
    document.querySelector('#'+id+' thead td:nth-child(2)').dataset.year = D.getFullYear();

    if (document.querySelectorAll('#'+id+' tbody tr').length < 6) { 
    // чтобы при перелистывании месяцев не "подпрыгивала" вся страница, добавляется ряд пустых клеток. Итог: всегда 6 строк для цифр
        document.querySelector('#'+id+' tbody').innerHTML += '<tr><td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;';
    }
}

Calendar("calendar", new Date().getFullYear(), new Date().getMonth());
// переключатель минус месяц
document.querySelector('#calendar thead tr:nth-child(1) td:nth-child(1)').onclick = function() {
  Calendar("calendar", document.querySelector('#calendar thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar thead td:nth-child(2)').dataset.month)-1);
  getDate();
}
// переключатель плюс месяц
document.querySelector('#calendar thead tr:nth-child(1) td:nth-child(3)').onclick = function() {
  Calendar("calendar", document.querySelector('#calendar thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar thead td:nth-child(2)').dataset.month)+1);
  getDate();
}

//Своя часть
getDate();

function getDate(){
    let newArray = document.querySelectorAll('tbody tr td');

    let length = newArray.length;
    let numbers = [];

    for(let i = 0; i < length; i++){
        if(newArray[i].innerHTML >0 && newArray[i].innerHTML < 32){
            numbers.push(newArray[i]);
        }
    }

    numbers.forEach(item =>{
        item.addEventListener('click', function(){
            let month = document.querySelector('[data-month]');
            let string = "";
            if(item.innerHTML < 10)
                string += '0' + item.innerHTML + '.';
            else
                string += item.innerHTML + '.';
            month_number = Number(month.getAttribute('data-month')) + 1;
            if(month_number < 10)
                string += '0' + month_number + '.';
            else
                string += month_number + '.';
            string += month.getAttribute('data-year');

            let text = document.querySelector('#text').textContent = string;
        });
    });
}
