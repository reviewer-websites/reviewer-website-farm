'use strict';
const $ = id => document.getElementById(id);
const video = $('demo-video');
const clips = {
 mapping: { caption: 'Watch FARM build object memory across a large outdoor environment, then continue mapping in a warehouse.', target: 'section-iii-a', ref: 'Method details · Appendix III-A', title: 'III-A · Memory Construction Details' },
 retrieval: { file: 'retrieval-anonymized', caption: 'Watch a physical robot act on relational language: retrieve the intended object and navigate to its stored viewpoint.', target: 'section-v-k', ref: 'Robot protocol · Appendix V-K', title: 'V-K · Spot Demonstration' },
 scale: { caption: 'From 15 m² rooms to 15,000 m² outdoor environments, the evaluated scene areas span three orders of magnitude. This clip illustrates how the object memory scales across environments.', target: 'section-iv', ref: 'Scene details · Appendix IV', title: 'IV · FARM-Scenes' },
 full: { file: 'full-anonymized', caption: 'Chapter shortcuts:', target: 'section-v-k', ref: 'Robot studies · Appendix V-K–L', title: 'V-K–L · Robot studies' }
};
function selectVideo(key) {
 const clip = clips[key];
 video.pause();
 video.preload = 'metadata';
 video.poster = `assets/posters/${clip.file || key}.jpg`;
 video.src = `assets/videos/${clip.file || key}.mp4`;
 video.setAttribute('aria-label', document.querySelector(`[data-video="${key}"] strong`).textContent);
 video.load();
 $('video-error').hidden = true;
 document.querySelectorAll('[data-video]').forEach(button => { const active = button.dataset.video === key; button.setAttribute('aria-selected', String(active)); button.tabIndex = active ? 0 : -1; });
 $('caption-text').textContent = clip.caption;
 $('video-caption').setAttribute('aria-labelledby', `tab-${key}`);
 const ref = $('video-appendix'); ref.textContent = clip.ref; ref.dataset.scroll = clip.target;
 $('full-chapters').hidden = key !== 'full';
}
document.querySelectorAll('[data-video]').forEach(button => button.addEventListener('click', () => selectVideo(button.dataset.video)));
document.querySelector('[role="tablist"]').addEventListener('keydown', event => {
 const tabs = [...document.querySelectorAll('[data-video]')]; const index = tabs.indexOf(document.activeElement);
 if (index < 0) return;
 let next;
 if (['ArrowRight','ArrowDown'].includes(event.key)) next = (index + 1) % tabs.length;
 if (['ArrowLeft','ArrowUp'].includes(event.key)) next = (index + tabs.length - 1) % tabs.length;
 if (event.key === 'Home') next = 0;
 if (event.key === 'End') next = tabs.length - 1;
 if (next !== undefined) { event.preventDefault(); tabs[next].focus(); selectVideo(tabs[next].dataset.video); }
});
document.querySelectorAll('[data-time]').forEach(button => button.addEventListener('click', () => {
 const seek = () => { video.currentTime = Number(button.dataset.time); video.play().catch(() => {}); };
 if (video.readyState >= 1) seek(); else { video.addEventListener('loadedmetadata', seek, {once:true}); video.load(); }
}));
video.addEventListener('error', () => { $('video-error').hidden = false; });
document.querySelectorAll('[data-scroll]').forEach(button => button.addEventListener('click', () => {
 const target = $(button.dataset.scroll); if (!target) return; target.scrollIntoView({block:'start'}); target.setAttribute('tabindex','-1'); target.focus({preventScroll:true});
}));
