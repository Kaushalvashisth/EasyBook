var timeInter=setInterval(animation,2400);
var timeInter=setInterval(arrow,2000);

function animation(){
    for (let index = 1; index <=4; index++) {
        $(`#txt${index}`).toggle(index*500);
        // $(`#txt${index}`).show(index*500);
    }   
}
function arrow(){
    for (let index = 2; index >=1; index--) {
        $(`#arr${index}`).hide(index*500);
        $(`#arr${index}`).show(index*500);
    }  
}
$(document).ready(function(){
    // alert("hello");
    console.log(data);
    
    $('#button-5').on('click',function(){
        $('#login').removeClass("login");
        $('#poster').hide(1500);
        $('#firstNavbar').fadeOut(800);
    });
    $('#login-form').on('submit',function(event){
        // alert("aksdfbsdjfjk");
        var name =data.find(function(req,res){
            if(req.name==$('#inputEmail').val())
                return true;
        });
        var password=data.find(function(req,res){
            if(req.password==$('#inputPassword').val())
                return true;
        });
        var invalid=`<div><h5 class="text-danger text-uppercase text-muted ">!!! Incorrect Credentials</h5></div>`;
        if(name&&password){
            window.location='nowShowing.html';
        }
        else{
            $("#invalid-input").html(invalid);   
        }
        // console.log();
        // console.log($('#inputPassword').val());
        event.preventDefault();
    });
    $('#go-to-reg').on('click',function(event){
        $('#login').fadeOut(1000);
        $('#register').removeClass('register');
        event.preventDefault();
    });
    $('#register-form').on('submit',function(event){
        // alert("register m gya");
        var n=$("#name").val();
        var e=$("#inputEmail2").val();
        var p=$("#inputPassword2").val();
        
        var object={name:n,email:e,password:p};
        data.push(object);
        // console.log(data);
        $('#success-reg').html(`<h4 class="pt-4 themecolor"><i>SuccessFull Registeration</i></h4>`)
        // window.location()

        // $('html,body').stop().animate({
        //     scrollLeft: '+=' + 0,
        //     scrollTop: '+=' + -(screen.height-100)
        //   },2000);
        event.preventDefault();
    });
    $('#go-to-login').on('click',()=>{
        $('#login').fadeIn(1000);
        $('#register').addClass('register')
    });
    
});
// function scrolldown() {
//     return this.animate({
//         scrollLeft: '+=' + 0,
//         scrollTop: '+=' + screen.height
//     },2000);
//   }
