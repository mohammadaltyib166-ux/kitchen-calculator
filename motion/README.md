# موشن — أكواد حركة للفيديوهات العمودية

مشروع [Remotion](https://www.remotion.dev) (React) فيه ثلاثة أنماط حركة مستوحاة من فيديوهات مجلد «الهام». كل الفيديوهات عمودية 1080×1920 بسرعة 30 إطارًا في الثانية.

| النمط | الملف | الفكرة |
|---|---|---|
| `GoldDark` | `src/scenes/GoldDark.tsx` | خلفية سوداء بتوهج ذهبي، عنوان بكلمة مظللة، بطاقات زجاجية، ترجمة كلمة بكلمة، عدّاد، منحنى توقيت يُرسم |
| `CreamUI` | `src/scenes/CreamUI.tsx` | خلفية كريمية، خط عريض، لون برتقالي، بطاقات واجهة: كتابة نص، تايملاين بمؤشر يتحرك، أيقونات |
| `GlowOverlay` | `src/scenes/GlowOverlay.tsx` | عناوين صفراء متوهجة فوق فيديو حقيقي، تمدد أفقي للكلمة، قطع برتقالية تعبر الشاشة، نجوم لامعة |

## المكونات القابلة لإعادة الاستخدام

- `src/components/Kinetic.tsx`
  - `WordCaption`: ترجمة تظهر كلمة بعد كلمة
  - `HighlightTitle`: عنوان فيه كلمة مظللة، تُكتب بين قوسين: `"كأنه [مونتير] مبتدئ؟"`
  - `CountUp`: رقم يعدّ مع توهج
  - `StretchGlowTitle`: كلمة تتمدد أفقيًا مع توهج
- `src/components/Surfaces.tsx`
  - الخلفيات و`PopCard` (بطاقة تقفز من الأسفل)
  - `StepBadge` (شارة مثل `01 / 05`) و`ProgressLine` (خط تقدم)
  - `Sparkle` (نجمة لامعة) و`SweepSlab` (قطعة برتقالية تعبر الشاشة)
- `src/components/motion.ts`: منحنيات التوقيت المشتركة (easing)

الخطوط (Cairo وLalezar) محفوظة داخل `public/fonts`، فلا يحتاج الريندر إلى الإنترنت.

## التشغيل

```bash
cd motion
npm i
npm run dev                                # معاينة تفاعلية في Remotion Studio
npx remotion render GoldDark out/GoldDark.mp4
```

### استخدام فيديوك في نمط GlowOverlay

ضع الفيديو في `public/footage.mp4` (لا يُرفع إلى Git)، ثم:

```bash
npx remotion render GlowOverlay out/GlowOverlay.mp4 --props='{"footage":"footage.mp4"}'
```

### تعديل النصوص

النصوص مكتوبة مباشرة داخل ملفات `src/scenes/*.tsx`. غيّرها ثم أعد الريندر. مدة كل مشهد في `durationInFrames` (30 = ثانية واحدة).
