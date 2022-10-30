console.log('test');
 var uname = 'asdasdas';
var age = "23";
var tel = '12312312321';
async function test() {
    var url = 'http://localhost:5000/api/create/user'
   await fetch(
        url,{
          method:'POST',
        //   headers: {
        //     "Content-Type": "application/json",
        // },
         headers: {"Content-type": "application/json; charset=UTF-8"},
         body:JSON.stringify({
          "name":uname,
          age,
          tel
         })
        }
      ).then((res) => res.json().then((data) => console.log(data))).catch((error)=>console.log(error));
  }
  
  
  