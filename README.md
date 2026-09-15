# FARM supplementary website

A standalone website for anonymous review. Open `index.html` in a modern browser, or use the included optional local server:

```sh
python3 serve.py --port 8794
```

Then visit `http://127.0.0.1:8794/`.

## Contents

- Three short demonstrations and a compressed full video.
- A short reading guide and section navigation.
- The complete appendix as native, searchable HTML: five main sections, 11 numbered tables (Table A9 has three parts), five numbered figures using six individual images, three additional Unitree A2 setup frames, equations, and 20 bibliography entries.
- No PDF files, page scans, external links, remote libraries, tracking, or submission author/affiliation blocks.

## Files

- `index.html`: all appendix text, tables, native MathML equations, and video controls.
- `styles.css`: responsive layout and typography.
- `app.js`: video selection, chapters, and navigation within the page.
- `assets/figures/`: individual appendix figures.
- `assets/videos/` and `assets/posters/`: local media.
- `serve.py`: optional Python standard-library server with video seeking support.
- `robots.txt`: indexing exclusion for a server deployment.

No installation or build step is required. All appendix content remains readable with JavaScript disabled; JavaScript enables video selection and section shortcuts. Wide tables scroll horizontally on small screens. Equations use the browser’s built-in MathML rendering.

## Media and anonymity

The full video is approximately 86 MB, reduced from approximately 186 MB, with its complete 4-minute 31-second sequence retained. The full video uses the supplied anonymized edition, with its original audio preserved. Video 2 uses the supplied anonymized real-robot navigation clip (35 seconds), with its original audio preserved. The mapping and scene-scale clips remain silent reviewer copies. Figure assets are rendered from the anonymized appendix figures; they are not screenshots of appendix pages. Bibliographic citations are plain text and identify cited works, without outbound links.

Keep the entire folder together when copying or sharing it. Nothing is published automatically.

## Alignment with the main paper (15 September 2026)

Table A9(a) reports the retrieval-stage ablation under visible-mask IoU >= 0.1. Table A9(c) includes FARM-Scenes results of 16.3/47.3 for structured retrieval without reranking and 24.2/47.3 with Qwen@5, matching the main paper. Table A6 follows the main paper’s results, including the ScanNet–5 DAAAM+G MRR of 0.371. The A2 study holds targets and queries fixed to measure robustness across acquisition conditions. The eight Spot query outcomes, including two failures, are listed in Table A11.

The paper and native HTML share the same method definitions and evaluation scope. The source PDFs were rebuilt and visually checked. All video files are unchanged.
