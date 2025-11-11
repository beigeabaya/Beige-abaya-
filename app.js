/* WhatsApp button */
const WA_NUMBER = "971544608064"; // رقمك
function openWhatsApp(productName, sku, len, qty, notes){
 const t = `مرحبًا، أرغب في طلب ${productName} (رقم المنتج ${sku})\nالطول: ${len}\nالكمية: ${qty}\nملاحظات: ${notes||"-"}`;
 const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t)}`;
 window.open(url, '_blank');
}
/* Gallery modal (click to open, arrows to navigate) */
const modal = (() => {
 let idx = 0, list = [];
 const root = document.getElementById('galleryModal');
 if(!root) return null;
 const slides = root.querySelector('.slides');
 const prev = root.querySelector('.prev');
 const next = root.querySelector('.next');
 const close = root.querySelector('.close');
 function render(){
   slides.innerHTML = '';
   list.forEach((src, i) => {
     const s = document.createElement('div');
     s.className = 'slide' + (i===idx ? ' active' : '');
     const img = document.createElement('img');
     img.src = src; img.alt = `slide ${i+1}`;
     s.appendChild(img);
     slides.appendChild(s);
   });
 }
 function show(i){
   idx = (i + list.length) % list.length;
   [...slides.children].forEach((el, j)=> el.classList.toggle('active', j===idx));
 }
 prev?.addEventListener('click', ()=> show(idx-1));
 next?.addEventListener('click', ()=> show(idx+1));
 close?.addEventListener('click', ()=> root.classList.remove('open'));
 root?.addEventListener('click', (e)=>{ if(e.target===root) root.classList.remove('open'); });
 return {
   open(images, start=0){
     list = images; idx = start;
     render();
     root.classList.add('open');
   }
 }
})();
/* Bind cards */
document.addEventListener('click', (e)=>{
 const img = e.target.closest('[data-gallery-index]');
 if(img && modal){
   const card = img.closest('[data-gallery]');
   const sources = JSON.parse(card.dataset.gallery);
   const start = Number(img.dataset.galleryIndex) || 0;
   modal.open(sources, start);
 }
});
document.querySelectorAll('[data-wa]').forEach(btn=>{
 btn.addEventListener('click', ()=>{
   const card = btn.closest('.card');
   const productName = card?.dataset.name || 'BEIGE Abaya';
   const sku = card?.dataset.sku || '';
   const len = card?.querySelector('select[name="length"]')?.value || '-';
   const qty = card?.querySelector('input[name="qty"]')?.value || '1';
   const notes = card?.querySelector('input[name="notes"]')?.value || '';
   openWhatsApp(productName, sku, len, qty, notes);
 });
});
