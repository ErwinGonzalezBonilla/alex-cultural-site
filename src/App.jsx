import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Instagram,
  Music2,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  Youtube,
} from "lucide-react";

import {
  artist,
  slides,
  tracks,
  videos,
} from "./data/content";

function Logo() {
  return (
    <a
      className="logo"
      href="#inicio"
      aria-label="Alex Cultural - Inicio"
    >
      <img
        src="/images/logo.png"
        alt="Alex Cultural"
      />
    </a>
  );
}

function Navbar() {
  return (
    <header className="navbar">
      <Logo />

      <nav>
        <a
          className="active"
          href="#inicio"
        >
          Home
        </a>

        <a href="#musica">
          Música
        </a>

        <a href="#videos">
          Videos
        </a>

        <a
          href={artist.instagram}
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
        >
          <Instagram size={22} />
        </a>

        <a
          href={artist.tiktok}
          target="_blank"
          rel="noreferrer"
          aria-label="TikTok"
        >
          <Music2 size={22} />
        </a>

        <a
          className="contact-btn"
          href="#contacto"
        >
          Contacto
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section
      className="hero"
      id="inicio"
    >
      <div className="hero-copy">

        <p className="eyebrow">
          MÚSICA · CULTURA · CARACAS · MADRID
        </p>

        <h1>
          <span>ALEX</span>
          <strong>CULTURAL</strong>
        </h1>

        <p className="hero-phrase">
          {artist.phrase}
        </p>

        <a
          href="#musica"
          className="primary-btn"
        >
          <Play
            size={18}
            fill="currentColor"
          />
          ESCUCHAR MÚSICA
        </a>

      </div>

      <div className="hero-art">
        <img
          src="/images/hero.jpg"
          alt="Alex Cultural"
          className="hero-image"
        />
      </div>
    </section>
  );
}

function Gallery() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(
        (i) => (i + 1) % slides.length
      );
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const previousSlide = () => {
    setIndex(
      (index - 1 + slides.length) %
        slides.length
    );
  };

  const nextSlide = () => {
    setIndex(
      (index + 1) % slides.length
    );
  };

  return (
    <section
      className="gallery-wrap"
      aria-label="Galería"
    >

      <button
        className="gallery-arrow left"
        onClick={previousSlide}
        aria-label="Anterior"
      >
        <ArrowLeft />
      </button>

      <div className="gallery">

        {slides.map((slide, i) => (
          <img
            key={slide.image}
            src={slide.image}
            alt={slide.alt}
            className={
              i === index
                ? "gallery-main"
                : ""
            }
          />
        ))}

      </div>

      <button
        className="gallery-arrow right"
        onClick={nextSlide}
        aria-label="Siguiente"
      >
        <ArrowRight />
      </button>

      <div className="dots">

        {slides.map((_, i) => (
          <button
            key={i}
            className={
              i === index
                ? "dot active"
                : "dot"
            }
            onClick={() => setIndex(i)}
            aria-label={`Imagen ${i + 1}`}
          />
        ))}

      </div>

    </section>
  );
}

function MusicPlayer() {
  const audioRef = useRef(null);

  const [current, setCurrent] =
    useState(0);

  const [playing, setPlaying] =
    useState(false);

  const [progress, setProgress] =
    useState(0);

  const track = tracks[current];

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.src = track.src;
    audio.currentTime = 0;

    setProgress(0);

    if (playing) {
      audio
        .play()
        .catch(() =>
          setPlaying(false)
        );
    }
  }, [current]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const update = () => {
      setProgress(
        audio.duration
          ? (audio.currentTime /
              audio.duration) *
              100
          : 0
      );
    };

    const ended = () => {
      setCurrent(
        (i) =>
          (i + 1) %
          tracks.length
      );

      setPlaying(true);
    };

    audio.addEventListener(
      "timeupdate",
      update
    );

    audio.addEventListener(
      "ended",
      ended
    );

    return () => {
      audio.removeEventListener(
        "timeupdate",
        update
      );

      audio.removeEventListener(
        "ended",
        ended
      );
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() =>
          setPlaying(false)
        );
    }
  };

  const selectTrack = (i) => {
    setCurrent(i);
    setPlaying(true);
  };

  return (
    <section
      className="music section"
      id="musica"
    >

      <div className="section-heading">

        <h2>MÚSICA</h2>

        <p>
          ESCUCHA MIS CANCIONES
        </p>

      </div>

      <div className="player-grid">

        <div className="player-card">

          {/* PORTADA DEL ÁLBUM */}
          <div className="cover-art">
            <img
              src="/images/album-camelos.png"
              alt="CAMELOS - Alex Cultural"
            />
          </div>

          {/* CANCIÓN ACTUAL */}
          <div className="now-playing">

            <h3>
              {track.title}
            </h3>

            <p>
              {track.artist}
            </p>

          </div>

          {/* PROGRESO */}
          <div className="progress-row">

            <span>
              {playing
                ? "● REPRODUCIENDO"
                : "PAUSADO"}
            </span>

            <span>
              {track.duration}
            </span>

          </div>

          <div className="progress">
            <span
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          {/* CONTROLES */}
          <div className="controls">

            <button
              onClick={() =>
                selectTrack(
                  (current -
                    1 +
                    tracks.length) %
                    tracks.length
                )
              }
              aria-label="Anterior"
            >
              <SkipBack />
            </button>

            <button
              className="play-btn"
              onClick={toggle}
              aria-label={
                playing
                  ? "Pausar"
                  : "Reproducir"
              }
            >
              {playing ? (
                <Pause
                  fill="currentColor"
                />
              ) : (
                <Play
                  fill="currentColor"
                />
              )}
            </button>

            <button
              onClick={() =>
                selectTrack(
                  (current + 1) %
                    tracks.length
                )
              }
              aria-label="Siguiente"
            >
              <SkipForward />
            </button>

          </div>

          {/* VOLUMEN */}
          <div className="volume">

            <Volume2 size={17} />

            <span />

          </div>

          <audio ref={audioRef} />

        </div>

        {/* LISTA DE CANCIONES */}
        <div className="track-list">

          {tracks.map((item, i) => (

            <button
              key={item.title}
              className={
                i === current
                  ? "track active"
                  : "track"
              }
              onClick={() =>
                selectTrack(i)
              }
            >

              <span className="track-number">
                {i + 1}
              </span>

              <span className="track-play">

                {i === current &&
                playing ? (
                  <Pause
                    size={15}
                    fill="currentColor"
                  />
                ) : (
                  <Play
                    size={15}
                    fill="currentColor"
                  />
                )}

              </span>

              <span className="track-name">
                {item.title}
              </span>

              <span className="track-duration">
                {item.duration}
              </span>

            </button>

          ))}

        </div>

      </div>

      {/* MENSAJE ACTUALIZADO */}
      <p className="demo-note">
        ALEX CULTURAL · CAMELOS
      </p>

    </section>
  );
}

function Videos() {
  return (
    <section
      className="videos section"
      id="videos"
    >

      <div className="video-heading-row">

        <div className="section-heading">

          <h2>VIDEOS</h2>

          <p>
            MIRA MIS ÚLTIMOS VIDEOS EN YOUTUBE
          </p>

        </div>

        <a
          className="outline-btn"
          href={artist.youtube}
          target="_blank"
          rel="noreferrer"
        >
          VER MÁS EN YOUTUBE
          <Youtube size={19} />
        </a>

      </div>

      <div className="video-grid">

        {videos.map((video) => (

          <div
            className="video-card"
            key={video.title}
          >

            {/* VIDEO DE YOUTUBE DENTRO DE LA WEB */}
            <div className="video-frame">

              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />

            </div>

            <div className="video-info">

              <span>
                {video.title}
              </span>

              <small>
                {video.duration}
              </small>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

function Footer() {
  return (
    <footer id="contacto">

      <Logo />

      <div className="footer-social">

        <small>
          SÍGUEME EN
        </small>

        <div>

          <a
            href={artist.instagram}
            target="_blank"
            rel="noreferrer"
          >
            <Instagram />
          </a>

          <a
            href={artist.tiktok}
            target="_blank"
            rel="noreferrer"
          >
            <Music2 />
          </a>

          <a
            href={artist.youtube}
            target="_blank"
            rel="noreferrer"
          >
            <Youtube />
          </a>

        </div>

      </div>

      <div className="footer-phrase">
        La música
        <br />
        nos une <i>↗</i>
      </div>

    </footer>
  );
}

export default function App() {
  return (
    <div className="app">

      <Navbar />

      <main>

        <Hero />

        <Gallery />

        <MusicPlayer />

        <Videos />

      </main>

      <Footer />

    </div>
  );
}