(function () {
    // consts
    const API_URL = "http://shamscloud.uz:8081/say?" //New API needed
    const DEFAULT_VOICE = "sevinch"

    // elems
    const text = document.querySelector("#text-to-speak");
    const playButton = document.querySelector('#speak-button');
    const audioPlayer = document.getElementById('audio-player2');
    const downloadMp3Button = document.getElementById('downloadMp3Button');
    const downloadWavButton = document.getElementById('downloadWavButton');
    
    let voice = DEFAULT_VOICE;
    let prevText = "";

// select a voice
//    if (lang.value === 'uz') {
//        voice = 'sevinch' // change to 'dilnavoz' if needed
//    } else if (lang.value === 'en') {
//        voice = 'slt'
//    } else if (lang.value === 'en') {
//        voice = 'aleksandr'
//    }

   playButton.onclick = () => {
        // Check if the text has changed
        if (text.value !== prevText) {
            let params = { voice: voice, text: text.value }
            let url = API_URL + new URLSearchParams(params)

            // Update audioPlayer source only if text has changed
            audioPlayer.src = url;
            audioPlayer.load();
            audioPlayer.play();

            // Update prevText with the current text value
            prevText = text.value;
        }
    }
   
    //TODO: write script to download as MP3 or wave
    downloadMp3Button.onclick = () => {
        let params = { voice: voice, text: text.value, format: 'mp3' }
        let url = API_URL + new URLSearchParams(params);

        const blob = new Blob([''], { type: 'audio/mp3' });
        const urlObject = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = urlObject;
        link.download = 'audio.mp3';
        link.click();
    }

    downloadWavButton.onclick = () => {
        let params = { voice: voice, text: text.value, format: 'wav' }
        let url = API_URL + new URLSearchParams(params);

        const blob = new Blob([''], { type: 'audio/wav' });
        const urlObject = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = urlObject;
        link.download = 'audio.wav';
        link.click();
    }
   
}()); 