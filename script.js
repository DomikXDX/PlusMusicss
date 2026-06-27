const audioPlayer = document.getElementById('audioPlayer');
const loopBtn = document.getElementById('loopBtn');
const addBtn = document.getElementById('addBtn');
const addForm = document.getElementById('addForm');
const saveBtn = document.getElementById('saveBtn');
const playlist = document.getElementById('playlist');
const currentTitle = document.getElementById('currentTitle');
const currentArtist = document.getElementById('currentArtist');
const coverImage = document.getElementById('coverImage');
const coverWrapper = document.querySelector('.cover-wrapper');

let isLooping = false;
let tracks = []; // Здесь будут храниться добавленные треки

// Управление повтором
loopBtn.addEventListener('click', () => {
    isLooping = !isLooping;
    audioPlayer.loop = isLooping;
    loopBtn.innerText = isLooping ? 'Повтор: ВКЛ' : 'Повтор: ВЫКЛ';
    loopBtn.style.backgroundColor = isLooping ? 'var(--acid-green)' : 'var(--acid-purple)';
    loopBtn.style.color = isLooping ? 'var(--acid-purple)' : 'var(--acid-green)';
});

// Анимация обложки при воспроизведении
audioPlayer.addEventListener('play', () => coverWrapper.classList.add('playing'));
audioPlayer.addEventListener('pause', () => coverWrapper.classList.remove('playing'));

// Показать/скрыть форму добавления
addBtn.addEventListener('click', () => {
    addForm.classList.toggle('hidden');
});

// Добавление трека
saveBtn.addEventListener('click', () => {
    const title = document.getElementById('songTitle').value || 'Неизвестный трек';
    const artist = document.getElementById('songArtist').value || 'Неизвестный автор';
    const songFile = document.getElementById('songFile').files[0];
    const coverFile = document.getElementById('coverFile').files[0];

    if (!songFile) {
        alert('Хей, ты забыл выбрать файл с музыкой!');
        return;
    }

    // Создаем временные ссылки на файлы для браузера
    const track = {
        title: title,
        artist: artist,
        audioUrl: URL.createObjectURL(songFile),
        coverUrl: coverFile ? URL.createObjectURL(coverFile) : 'https://via.placeholder.com/200/9d00ff/bfff00?text=NO+COVER'
    };

    tracks.push(track);
    renderPlaylist();
    
    // Очищаем форму
    document.getElementById('songTitle').value = '';
    document.getElementById('songArtist').value = '';
    addForm.classList.add('hidden');
});

// Отрисовка списка
function renderPlaylist() {
    playlist.innerHTML = '';
    tracks.forEach((track, index) => {
        const li = document.createElement('li');
        li.innerText = `${track.artist} — ${track.title}`;
        li.addEventListener('click', () => playTrack(index));
        playlist.appendChild(li);
    });
}

// Запуск трека
function playTrack(index) {
    const track = tracks[index];
    currentTitle.innerText = track.title;
    currentArtist.innerText = track.artist;
    coverImage.src = track.coverUrl;
    audioPlayer.src = track.audioUrl;
    audioPlayer.play();
}