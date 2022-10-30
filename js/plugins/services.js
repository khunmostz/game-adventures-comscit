async function fetchCourse() {
  var url = 'https://e691-2405-9800-b870-cffd-8e5-6afb-490e-2cb9.ap.ngrok.io/api/get/course'
 await fetch(
      url
    ).then((res) => res.json().then((data) => console.log(data)));
}
console.log("message from service...");
