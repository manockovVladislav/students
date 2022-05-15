
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


$('.regisrtButton').click(function () {
  
    requestCreatePerson();
});

function requestCreatePerson() {

    const csrftoken = getCookie('csrftoken');

    var firstName = $('#firstName').val();
    var lastName = $('#lastName').val();
    var group = $('#group').val();
 

    if (firstName == '') {
        return alert("Поле Имя не может быть пустым!");
    }
    if (lastName == '') {
        return alert("Поле Фамилия не может быть пустым!");
    }
    if (group == '') {
        return alert("Поле Группа не может быть пустым!");
    }

    var dataRegistr = {
        csrfmiddlewaretoken: csrftoken,
        firstName:  firstName,
        lastName: lastName,
        group: group,
    }

    $.ajax({
        method: "POST",
        dataType: "json",
        //async: false,
        data: dataRegistr,
        url: 'http://127.0.0.1:8000/route/create/',
        // headers: { "X-CSRFToken": csrftoken },
        success: function (response) {
            // console.log("success" + JSON.stringify(response)); 
            console.log(response.status);
        },
        error: function (err) {
            console.log("error");
            console.log(err);
        }
    });
}





$('.getList').click(function () {
    getList();
});

function getList() {

    $.ajax({
        type: 'GET', 
        // dataType: "json",
        url: 'http://127.0.0.1:8000/route/list/',
        // headers: { "X-CSRFToken": csrftoken },
        success: function (response) {
            if (response) {
            var jsonRes = JSON.parse(response)
              console.log(jsonRes)

            }
        },
        error: function (err) {
            console.log("error");
            console.log(err);
        }
    });
}


$( "#toggleButton" ).click(function() {
    $( ".registrationsToggle" ).slideToggle( "fast" );
  });


  class ComponentAPI {
      constructor(method, link, data){
        this.method = method;
        this.link = link;
        this.data = data;
      }
      
      get getRequest() {
        return this.request();
      }

    request() {
        var res = $.ajax({
            type: this.method, 
            data: this.data,
            url: this.link,
            // headers: { "X-CSRFToken": csrftoken },
            success: function (response) {
                try{
                    var jsonRes = JSON.parse(response);
                 }  
                 catch{
                     var jsonRes = response;
                 }
     
                //  if (response) {
                //    console.log(jsonRes);
                //  }
                return jsonRes
            },
            error: function (err) {
                console.log("error");
                console.log(err);
            }
        });

        return res
    }
  }

async function getRes(){
    var list_all_method = "GET";
  var list_all_link = 'http://127.0.0.1:8000/route/students/';
  var list_all_students = new ComponentAPI(list_all_method, list_all_link);
  var all_req = await list_all_students.getRequest;
  console.log(JSON.parse(all_req));

  var list_one_method = "GET";
  var list_one_link = 'http://127.0.0.1:8000/route/students/1';
  var list_one_students = new ComponentAPI(list_one_method, list_one_link);
  var one_req = await list_one_students.getRequest;
  console.log(JSON.parse(one_req));

  var data = {
    "firstName": "Ivan", "lastName": "Ivanov", "group": "VIS21"
  }
  var list_one_method = "POST";
  var list_one_link = 'http://127.0.0.1:8000/route/students/';
  var list_one_students = new ComponentAPI(list_one_method, list_one_link, data);
  var one_req = await list_one_students.getRequest;
  console.log(one_req);
  
  var data_put = {
    "firstName": "Semen"
  }
  var list_put_method = "PUT";
  var list_put_link = 'http://127.0.0.1:8000/route/students/5/';
  var list_put_students = new ComponentAPI(list_put_method, list_put_link, data_put);
  var put_req = await list_put_students.getRequest;
  console.log(put_req);
  
  var list_put_method = "DELETE";
  var list_put_link = 'http://127.0.0.1:8000/route/students/22/';
  var list_put_students = new ComponentAPI(list_put_method, list_put_link);
  var put_req = await list_put_students.getRequest;
  console.log(put_req);
}




getRes()
  


  