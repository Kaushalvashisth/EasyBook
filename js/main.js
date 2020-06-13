var seleted=[];
var pnr=[];
$(document).ready(function(){
    // alert("hello");
    $("#searchForm").on("submit",function(event){
        var searchText=$('#searchText').val();
        getMovies(searchText);
        event.preventDefault();
    });
});
function getMovies(searchText){
    // alert(searchText);
    axios.get('http://www.omdbapi.com/?s='+searchText+'&apikey='+config.apiKey)
    .then((response) => {
        console.log(response);
        let movies = response.data.Search;
        let output = '';
        $.each(movies, (index, movie) => {
            var str =`${movie.Title}`;
            if(str.length > 20) str = str.substring(0,15);
          output += `
            <div class="col-md-3 col-sm-6  mb-4 ">
              <div class="well text-center zoom">
                <img src="${movie.Poster}" class="img-thumbnail">
                <h5 class="themecolor"><b>${str}</b></h5>
                
                <a onclick="movieSelect('${movie.imdbID}');" class="btn btn-outline-success" href="#">Movie Details</a>

                <a href="#" class="btn btn-outline-danger "><i class="far fa-heart"></i></a>
              </div>
            </div>
          `;
        });
  
        $('#movies').html(output);
      })
      .catch((err) => {
        console.log(err);
      });
}
function movieSelect(id){
  // alert("hi");
  sessionStorage.setItem('movieId',id);
  window.location='movie.html';
  // getMovies2();
  return false;
}
// function EnterComments() {
//     console.log("test");
    
// }
function nowShowing(){
  // film1
  var arr=['tt8936646','tt1489887','tt2726560','tt7975244','tt10023024','tt4154796','tt4154664','tt1856101','tt6320628','tt8907986','tt4425200'];
  for (let i = 0; i < arr.length; i++) {
      axios.get(`http://www.omdbapi.com/?i=${arr[i]}&apikey=`+config.apiKey)
      .then((response)=>{
        let movie = response.data;
        console.log(response);
        var collect= '';

        collect += `
          <div class="well text-center">
            <img src="${movie.Poster}" class="img-thumbnail">
            <h5 class="themecolor"><b>${movie.Title}</b></h5>
            
            <a onclick="movieSelect('${arr[i]}');" class="btn btn-outline-success" href="#">Movie Details</a>

            <a href="#" class="btn btn-outline-danger "><i class="far fa-heart"></i></a>
          </div>
        `;
        $(`#recentMovies${i}`).html(collect);
      })
      .catch((err) => {
        console.log(err);
      });
  
  }    // console.log(output);
  $('#moreMovies').on('click',()=>{
    
    $('#moreMovies').hide(500);
    
    for (let i = 4; i < 11; i++) {
      $(`#recentMovies${i}`).removeClass('hidden');   
    }
    
    for (let i = 0; i < 4; i++) {
      $(`#recentMovies${i}`).addClass('mb-4');   
    }
  })
}
function getMovies2(){
  // alert("hello");
  let movieId=sessionStorage.getItem('movieId');
  axios.get('http://www.omdbapi.com/?i='+movieId+'&apikey='+config.apiKey)
  .then((response) => {
    console.log(response);
    let movie = response.data;

    let output =`
      <div class="row">
        <div class="col-md-4">
          <img src="${movie.Poster}" class="img-thumbnail">
        </div>
        <div class="col-md-8">
          <h2 class="themecolor"><b>${movie.Title}</b></h2>
          <ul class="list-group">
            <li class="list-group-item"><strong >Genre:</strong> ${movie.Genre}</li>
            <li class="list-group-item"><strong>Runtime:</strong> ${movie.Runtime}</li>
            <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
            <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
            <li class="list-group-item"><strong>BoxOffice:</strong> ${movie.BoxOffice}</li>
            <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
            <li class="list-group-item"><strong>Language:</strong> ${movie.Language}</li>
          </ul>
        </div>
      </div>
      <div class="row mt-4 mb-4">
        <div class="well pl-4">
          <h3 class="themecolor"><b>Plot</b></h3>
          ${movie.Plot}
          <hr>
          <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-outline-success">View IMDB</a>
          <a onclick="movieBook('${movie.Title}');"  class="btn btn-outline-danger" href="#">Book Tickets</a>
          <a class="btn btn-outline-info" href='https://www.youtube.com/results?search_query=${movie.Title}+trailer'>Trailer</a>
        </div>
      </div>
    `;

    $('#movies2').html(output);
  })
  .catch((err) => {
    console.log(err);
  });
}

function movieBook(Title){
  //  alert("hi");
  sessionStorage.setItem('title',Title);
  window.location='booking.html';
  // getMovies2();
  return false;
}
function DisplayTitle(){
  $('#noActionBtn').on('click',(e)=>{
    e.preventDefault();
    alert("Please complete the payment");
  })
  let movieName=sessionStorage.getItem('title');
  // alert(movieName);
  var o1=`
          <h1 class="themecolor">${movieName}:- </h1>
          <hr>
          `
  $('#movieName').html(o1);
}
function DisplayShow(cinema){
  // alert(cinema);
  sessionStorage.setItem('cinema',cinema);
  $('#selecTheatre').hide();
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  t1 = dd + '.' + mm + '.' + yyyy;
  t2= (Number(dd)+Number(1))+ '.' + mm + '.' + yyyy;
  t3=(Number(dd)+Number(2))+ '.' + mm + '.' + yyyy;
  t4=(Number(dd)+Number(3))+ '.' + mm + '.' + yyyy;
  t5=(Number(dd)+Number(4))+ '.' + mm + '.' + yyyy;
  var o2=`
        <div class="text-center container">
        <h1 class="themecolor">Select Date:- </h1>
        <hr>
        <button onclick="displayTiming('${t1}')" href="#" class="btn btn-outline-info btn-md d-inline">${t1}</button>
        <button onclick="displayTiming('${t2}')" href="#" class="btn btn-outline-info btn-md d-inline">${t2}</button>
        <button onclick="displayTiming('${t3}')" href="#" class="btn btn-outline-info btn-md d-inline">${t3}</button>
        <button onclick="displayTiming('${t4}')" href="#" class="btn btn-outline-info btn-md d-inline">${t4}</button>
        <button onclick="displayTiming('${t5}')" href="#" class="btn btn-outline-info btn-md d-inline">${t5}</button>
        </div>
        `
  // var aaj =$('#today');
  // aaj.append(`<h2>${tom}::</h2> <br>`);
  $('#date').html(o2);
}
function displayTiming(date){
  $('#date').hide();
  sessionStorage.setItem('date',date);
  // alert(date);
  var o3=`
        <div class="text-center container">
        <h1 class="themecolor">Select Show Timing:- </h1>
        <hr>
        <button onclick="setTime('9:00 AM')" href="#" class="btn btn-outline-info btn-md d-inline">10:00 AM</button>
        <button onclick="setTime('10:00 AM')" href="#" class="btn btn-outline-info btn-md d-inline">10:00 AM</button>
        <button onclick="setTime('12:00 PM')" href="#" class="btn btn-outline-info btn-md d-inline">12:00 PM</button>
        <button onclick="setTime('1:00 PM')" href="#" class="btn btn-outline-info btn-md d-inline">1:00 PM</button>
        <button onclick="setTime('3:00 PM')" href="#" class="btn btn-outline-info btn-md d-inline">3:00 PM</button>
        </div>
        `
  $('#time').html(o3);
}
function setTime(time){
  sessionStorage.setItem('time',time);
  // alert(sessionStorage.getItem('time'));
  $('#time').hide();
  $('#seats').removeClass('seats');
  var noOfButtons=document.querySelectorAll('.seat-button').length;
  for (let i = 0; i < noOfButtons; i++) {
    document.querySelectorAll('.seat-button')[i].addEventListener('click',function(){
      var seat_no=this.innerHTML;
      seleted.push(seat_no);
      selectedSeat(seat_no);
    })
  }
}
function selectedSeat(seat_no){
  $(`#${seat_no}`).addClass('pressed');
  // console.log(seleted);
}
function paymentPortal() {
  $(`#seats`).hide();
  $('#payment').removeClass('hidePaymentForm');
  var amount=seleted.length*200;
  $('#confirmPayment').html('PAY ₹'+amount);
  var film=sessionStorage.getItem('title');
  var date=sessionStorage.getItem('date');
  var time=sessionStorage.getItem('time');
  // alert(film);
  var o5=`<p>${seleted.length} Tickets for ${film}</p>
          <p>Date: ${date}  Time: ${time}</p>
          `
  $('#ticket-info').html(o5);
  const month=document.getElementById('month');
  const year=document.getElementById('year');
  var cardNumber=document.getElementById('cardNumber');
  var username=document.getElementById('username');
  $(document).on("submit","#paymentForm",function(event){
    event.preventDefault();
    //  alert(cardNumber.value);
    // sessionStorage.setItem('cardNumber.value',cardNo);  
    var errors=[];
    var slicing=date.split(".");
    var currentMonth=Number(slicing[1]);
    // var currentYear=slicing[2];
    // alert(currentMonth);
    if (month.value>12||month.value==0){
      errors.push("Month should be within (1-12) ")
    }
    if ((year.value<=20&&month.value<=currentMonth)||year<20) {
      errors.push("Your Card is expired!! ");
    }
    if(errors.length>0){
      var message=errors.join(`<br>`);
      $('#errorMessage').html(`<p class="text-danger">${message}</p>`);
    }
    else{
      // event.preventDefault();
      $('#payment').hide();
      $('#downloadCancel').removeClass('hideDownload');
      // alert(cardNo);
    }
    var ticketNo=generatePNR(Number(slicing[0]));
    
    // alert(ticketNo);
    $('#pnrShow').html(`<p class="text-success">Your Ticket Number is ${ticketNo}</p>`);
    
    // qr code generation
    var qrcode= new QRCode(document.getElementById("qrcode"));
    var qrdata= `${seleted.length} tickets for "${film}" on ${date} at ${time} `
    qrcode.makeCode(qrdata); 
    Ticket(cardNumber.value,username.value);
  })
  // console.log(Object.keys(sessionStorage));
}
function generatePNR(date){
  var random=Math.random()*1000000;
  random=Math.floor(random)+1000000;
  var ticketNo=date+"/"+random;
  pnr.push(ticketNo);
  return ticketNo;
}
function TicketCancel(){
  // alert("hello");
  $('#downloadCancel').hide();
  $('#ticketCancel').removeClass('hideTicketCancel');
  var ticketNum=document.getElementById('ticNum');
  var message=" ";
  // alert("hello34567");
  $('#cancelInfo').on("submit",function(event){
    // alert(ticketNum.value);
    if(pnr.includes(ticketNum.value)){
      message=`
          <h3 class="text-success">
          Ticket Cancelled Succesfully!!<i class="fas fa-glass-cheers"></i>
          </h3>
          `
        // removeItem(ticketNum.value, pnr);
    }
    else{
      message=`
          <h3 class="text-danger">
          Invalid Ticket Number !!!!&nbsp; 
        </h3>`
    }
    $('#cancelMessage').html(message);
    event.preventDefault();
  })
}
function Ticket(cardNumber,username){
  cardNumber=cardNumber+"";
  cardNumber=cardNumber.slice(0,4)+" xxxx"+" xxxx";

  var film=sessionStorage.getItem('title');
  var cinema=sessionStorage.getItem('cinema');
  var date=sessionStorage.getItem('date');
  var time=sessionStorage.getItem('time');
  const screens=["A1","A2","B1","B2","C1","C2","D1"];
  var screen=screens[Math.floor(Math.random() * screens.length)];
  var seats=``
  seleted.forEach(element => {
    seats+=` |${element}| `;
  });
var doc = new jsPDF()
// doc.setFontSize(40)
doc.setFont('courier')
doc.setFontType('bolditalic')

doc.text(5,10,"EasyBook.com");
// e-ticket
doc.setFontSize(15);
doc.text(80, 35,`E-Ticket:${pnr[0]}`);
doc.setLineWidth(0.8);
doc.line(70,38,140,38);//x,y,length,end of line y-axis
// details
doc.setFontSize(10);
doc.setFont('courier');
doc.setFontType('normal');
doc.text(30,45,`Movie: "${film}"`);
        doc.text(130,45,`Date: ${date}`);
doc.text(30,55,`Theatre: ${cinema}`);
      doc.text(130,55,`ShowTiming: ${time}`);
doc.text(30,65,`Screen: ${screen}`);
      doc.text(130,65,`Seats: ${seats}`);

// receipt
doc.setFontSize(15);
doc.setFont('courier')
doc.setFontType('bolditalic')
doc.text(90, 85," Receipt ");
doc.setLineWidth(1);
doc.line(70,88,140,88);//x,y,length,end of line y-axis

doc.setFontSize(10);
doc.setFont('courier');
doc.setFontType('normal');
var amount=seleted.length*200;
doc.text(30,95,`Payment Recieved: ${amount} INR`);
        doc.text(130,95,`Transaction ID: ${pnr[0]}`);
doc.text(30,105,`CardHolder: ${username}`);
        doc.text(130,105,`By Card: ${cardNumber}`);
// doc.addImage(imgdata, 'JPEG', 5, 5, 20, 20)

// contact
doc.setFontSize(9);
doc.setFont('courier')
doc.setFontType('bolditalic')
doc.text(150,125,`Contact Us`);

doc.setFontSize(8);
doc.setFont('courier');
doc.setFontType('normal');
        doc.text(140,130,`Phone:+880168361`);
        doc.text(140,135,`HeadOffice:Tropical Center`);
        doc.text(140,140,`E-Mail:kv@gmail.com`);

  $('#downloadTicket').on("click",(event)=>{
    event.preventDefault();
    // alert(cardNumber);
    // pdf.text(35,25,`PAYMENT BY ${cardNumber}`);
    doc.save();
  })

}
