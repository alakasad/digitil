// API sample:
// http://18.153.96.155:8081/say?voice=sevinch&text=Shoikrom%20ayvon%20to%E2%80%98ridagi //Need to update API

(function () {
    // consts
    const API_URL = "http://18.153.96.155:8081/say?" //New API needed
    const DEFAULT_VOICE = "sevinch"

    // elems
    const text = document.querySelector("#text-to-speak");
    const playButton = document.querySelector('#speak-button');

    let voice = DEFAULT_VOICE;

    // select a voice
//    if (lang.value === 'uz') {
//        voice = 'sevinch' // change to 'dilnavoz' if needed
//    } else if (lang.value === 'en') {
//        voice = 'slt'
//    } else if (lang.value === 'en') {
//        voice = 'aleksandr'
//    }

    playButton.onclick = () => {
        let params = {voice: voice, text: text.value}
        let url = API_URL + new URLSearchParams(params)

        //window.open(url, "_blank"); 
        
        audioPlayer.src = url; //Updating source of audioplayer
        audioPlayer.load();
        audioPlayer.play();
        
    }
}());