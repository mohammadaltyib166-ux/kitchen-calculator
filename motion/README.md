# موشن — فيديوهات ترويجية لحاسبة المطبخ

مشروع [Remotion](https://www.remotion.dev) (React) فيه ثلاثة فيديوهات عمودية (1080×1920، 30 إطارًا في الثانية) تروّج لحاسبة سعر مطبخ الألمنيوم. الأرقام في الفيديوهات من نفس معادلة الحاسبة: 4 م × 850 × 1.15 + أدراج + إضافات = 5,110 د.ل.

| النمط | الملف | لغة الحركة |
|---|---|---|
| `Blueprint` | `src/scenes/Blueprint.tsx` | مخطط هندسي على ورق أزرق: المطبخ يُرسم خطًا خطًا، خطوط مقاسات تمتد من المنتصف، معادلة تُحسب، وأرقام تدور مثل العدّاد |
| `Swatches` | `src/scenes/Swatches.tsx` | عيّنات تنقلب ثلاثية الأبعاد، علامات صح تُرسم، أسعار تطير إلى فاتورة يتحدث مجموعها، وختم «سعر تقديري» يُطبع بقوة |
| `Spotlight` | `src/scenes/Spotlight.tsx` | رسومات فوق فيديو مطبخ حقيقي: فتحة دائرية تكشف المشهد، شريط اسم بلمعة، خطوط إشارة تشير إلى الخزائن والرخام، بطاقة سعر معلقة تتأرجح، وزر واتساب يُضغط |

## المكونات القابلة لإعادة الاستخدام

- `src/components/Text.tsx`
  - `MaskLine`: سطر يصعد من خلف حافة مخفية
  - `UnderlineCaption`: ترجمة يتنقل خط تحتها من كلمة لكلمة
  - `RollingNumber`: رقم يدور مثل العدّاد الميكانيكي
- `src/components/Draw.tsx`
  - `DrawPath`: خط يُرسم مثل القلم
  - `DimensionLine`: خط مقاس هندسي
  - `CheckBadge` و`EmptyBox`: علامة صح تُرسم، ودائرة فارغة لغير المختار
- `src/components/Pieces.tsx`
  - الخلفيات و`FlipTile` (عيّنة تنقلب) و`Stamp` (ختم)
  - `SwingTag` (بطاقة سعر تتأرجح) و`Callout` (خط إشارة مع اسم)
  - `IrisReveal` (فتحة دائرية) و`LowerThird` (شريط اسم) و`PressButton` (زر يُضغط)
- `src/components/motion.ts`: منحنيات التوقيت، والتأرجح المتلاشي (`damped`)

الخطوط (Cairo وReem Kufi) محفوظة داخل `public/fonts`، فلا يحتاج الريندر إلى الإنترنت.

## التشغيل

```bash
cd motion
npm i
npm run dev                                   # معاينة تفاعلية في Remotion Studio
npx remotion render Blueprint out/Blueprint.mp4
```

### استخدام فيديو مطبخك في نمط Spotlight

ضع الفيديو في `public/footage.mp4` (لا يُرفع إلى Git)، ثم:

```bash
npx remotion render Spotlight out/Spotlight.mp4 --props='{"footage":"footage.mp4"}'
```

مواضع خطوط الإشارة (`x` و`y` في `Spotlight.tsx`) مضبوطة على الخلفية المؤقتة. عدّلها لتشير إلى الخزائن والرخام في فيديوك.

### تعديل النصوص والأسعار

النصوص والأرقام مكتوبة مباشرة داخل ملفات `src/scenes/*.tsx`. غيّرها ثم أعد الريندر. مدة كل مشهد في `durationInFrames` (30 = ثانية واحدة).

## مجلد «الهام» (النسخة الأولى)

كود النسخة الأولى محفوظ في `src/الهام/`، وهي النسخة القريبة من فيديوهات الإلهام: `GoldDark` و`CreamUI` و`GlowOverlay`.

في Remotion Studio تجدها في مجلد **Ilham**، لأن Remotion لا يقبل حروفًا عربية في أسماء المجلدات والفيديوهات. لريندر واحد منها:

```bash
npx remotion render Ilham-GoldDark out/Ilham-GoldDark.mp4
```

بعض نصوص هذه النسخة منقولة حرفيًا من فيديوهات الإلهام، فاستخدمها مرجعًا للتعلم فقط، ولا تنشرها كما هي.
