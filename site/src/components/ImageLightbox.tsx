import {AnimatePresence, motion} from 'framer-motion'
import {useState} from 'react'

interface ImageLightboxProps {
    src: string
    alt: string
    isOpen: boolean
    onClose: () => void
    type?: 'image' | 'video'
}

export function ImageLightbox({src, alt, isOpen, onClose, type = 'image'}: ImageLightboxProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="lightbox-overlay"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    onClick={onClose}
                    onKeyDown={(e) => e.key === 'Escape' && onClose()}
                    tabIndex={0}
                >
                    <motion.div
                        className="lightbox-content"
                        initial={{scale: 0.8, opacity: 0}}
                        animate={{scale: 1, opacity: 1}}
                        exit={{scale: 0.8, opacity: 0}}
                        transition={{type: 'spring', damping: 25}}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {type === 'image' ? (
                            <img src={src} alt={alt}/>
                        ) : (
                            <video
                                src={src}
                                controls
                                autoPlay
                                playsInline
                                controlsList="nodownload"
                                style={{width: '100%', height: 'auto'}}
                            >
                                Your browser does not support the video tag.
                            </video>
                        )}
                        <button className="lightbox-close" onClick={onClose} aria-label="Close">
                            ✕
                        </button>
                        <div className="lightbox-instructions">
                            Click outside or press ESC to close
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

interface ProjectMediaProps {
    imageSrc?: string
    videoSrc?: string
    alt: string
    className?: string
}

export function ProjectMedia({imageSrc, videoSrc, alt, className = ''}: ProjectMediaProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [showVideo, setShowVideo] = useState(false)

    const handleImageClick = () => {
        setShowVideo(false)
        setLightboxOpen(true)
    }

    const handleVideoClick = () => {
        setShowVideo(true)
        setLightboxOpen(true)
    }

    return (
        <>
            <div className={`project-media ${className}`}>
                {imageSrc && (
                    <div className="media-item image-preview" onClick={handleImageClick}>
                        <img src={imageSrc} alt={alt}/>
                        <div className="media-overlay">
                            <span className="media-icon">🔍</span>
                            <span className="media-label">View Screenshot</span>
                        </div>
                    </div>
                )}

                {videoSrc && (
                    <div className="media-item video-preview" onClick={handleVideoClick}>
                        <video src={videoSrc} muted loop playsInline/>
                        <div className="media-overlay">
                            <span className="media-icon">▶️</span>
                            <span className="media-label">Watch Demo</span>
                        </div>
                    </div>
                )}
            </div>

            <ImageLightbox
                src={showVideo ? videoSrc! : imageSrc!}
                alt={alt}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                type={showVideo ? 'video' : 'image'}
            />
        </>
    )
}

