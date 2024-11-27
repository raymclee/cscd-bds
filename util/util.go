package util

import (
	"cscd-bds/config"
	"fmt"
	"image"
	"image/jpeg"
	"image/png"

	"io"
	"mime"
	"os"
	"strings"

	"github.com/nfnt/resize"
	"github.com/rs/xid"
)

func SaveStaticFile(filename string, shouldResize bool) (string, error) {
	sourcePath := fmt.Sprintf("%stmp/%s", config.FilePath, filename)
	tf, err := os.Open(sourcePath)
	if err != nil {
		return "", fmt.Errorf("failed to open file: %w", err)
	}
	defer tf.Close()
	img, _, err := image.Decode(tf)
	if err != nil {
		return "", fmt.Errorf("failed to decode image: %w", err)
	}

	fn := fmt.Sprintf("%s-%s", xid.New(), filename)
	out, err := os.Create(fmt.Sprintf("%s%s", config.FilePath, fn))
	if err != nil {
		return "", fmt.Errorf("failed to create file: %w", err)
	}
	defer out.Close()

	if shouldResize {
		ri := resize.Thumbnail(800, 0, img, resize.Lanczos3)
		// handle different image types
		fmt.Println(mime.TypeByExtension(filename))
		switch {
		case strings.HasSuffix(filename, ".png"):
			if err := png.Encode(out, ri); err != nil {
				return "", fmt.Errorf("failed to encode image: %w", err)
			}
		case strings.HasSuffix(filename, ".jpeg"), strings.HasSuffix(filename, ".jpg"):
			if err := jpeg.Encode(out, ri, nil); err != nil {
				return "", fmt.Errorf("failed to encode image: %w", err)
			}
		default:
			return "", fmt.Errorf("unsupported image type: %s", mime.TypeByExtension(filename))
		}

	} else {
		if _, err := io.Copy(out, tf); err != nil {
			return "", fmt.Errorf("failed to save file: %w", err)
		}
	}

	if err = os.Remove(sourcePath); err != nil {
		return "", fmt.Errorf("failed to remove file: %w", err)
	}

	return fn, nil
}
