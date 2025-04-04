package util

import (
	"cscd-bds/config"
	"fmt"
	"io"

	"os"
)

func SaveStaticFile(tenderId string, filename string, shouldResize bool) (string, error) {
	sourcePath := fmt.Sprintf("%stmp/%s", config.FilePath, filename)
	tf, err := os.Open(sourcePath)
	if err != nil {
		return "", fmt.Errorf("failed to open file: %w", err)
	}

	fn := fmt.Sprintf("%s/%s", tenderId, filename)
	if err := os.MkdirAll(fmt.Sprintf("%s/%s", config.FilePath, tenderId), 0755); err != nil {
		return "", fmt.Errorf("failed to create directory: %w", err)
	}
	out, err := os.Create(fmt.Sprintf("%s/%s", config.FilePath, fn))
	if err != nil {
		return "", fmt.Errorf("failed to create file: %w", err)
	}

	// if runtime.GOOS == "linux" && config.IsProd {
	// 	vips.Startup(&vips.Config{})

	// 	inputImage, err := vips.NewImageFromFile(sourcePath)
	// 	if err != nil {
	// 		return "", fmt.Errorf("failed to open image: %w", err)
	// 	}
	// 	defer inputImage.Close()

	// 	switch {
	// 	case strings.HasSuffix(filename, ".png"):
	// 		ep := vips.NewJpegExportParams()
	// 		// ep.StripMetadata = true
	// 		ep.Quality = 75
	// 		// ep.Interlace = true
	// 		ep.OptimizeCoding = true
	// 		// ep.SubsampleMode = vips.VipsForeignSubsampleAuto
	// 		// ep.TrellisQuant = true
	// 		// ep.OvershootDeringing = true
	// 		// ep.OptimizeScans = true
	// 		// ep.QuantTable = 3
	// 		mageBytes, _, err := inputImage.ExportJpeg(ep)
	// 		if err != nil {
	// 			return "", fmt.Errorf("failed to export image: %w", err)
	// 		}
	// 		if err := os.WriteFile(fmt.Sprintf("/%s%s", config.FilePath, fn), mageBytes, 0644); err != nil {
	// 			return "", fmt.Errorf("failed to write file: %w", err)
	// 		}
	// 	case strings.HasSuffix(filename, ".jpeg"), strings.HasSuffix(filename, ".jpg"):

	// 	default:
	// 		return "", fmt.Errorf("unsupported image type: %s", mime.TypeByExtension(filename))
	// 	}

	// 	vips.Shutdown()

	// } else {
	if _, err := io.Copy(out, tf); err != nil {
		return "", fmt.Errorf("failed to save file: %w", err)
	}
	// }

	defer os.Remove(sourcePath)
	defer out.Close()
	defer tf.Close()

	return fn, nil
}

func DeleteStaticFile(tenderId string, filename string) error {
	if err := os.Remove(filename[1:]); err != nil {
		fmt.Println(fmt.Errorf("failed to delete file: %w", err))
	}
	return nil
}
