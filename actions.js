document.addEventListener('DOMContentLoaded', (event) => {
    const video = document.getElementById('bookletVideo');
    video.play();

    video.addEventListener('click', () => {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });
});
