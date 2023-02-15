const value = document.querySelectorAll(".contentText");

value.forEach((v) => (v.innerHTML = v.innerHTML.replaceAll("&lt;", "<").replaceAll("&gt;", ">")));

// const re = value[3].innerHTML;
// const ri = re.replaceAll("&lt;", "<").replaceAll("&gt;", ">");
// console.log(ri);

// value[3].innerHTML = ri;

