import Image from 'next/image'

function WhyChooseUs({ t }: { t: (key: string) => string }) {
  const itemsList = [
    {
      title: t('packaging'),
      description: t('packaging-description'),
      icon: '/assets/illustrations/about-us/pack.svg',
      iconSize: 40,
    },
    {
      title: t('quality'),
      description: t('quality-description'),
      icon: '/assets/illustrations/about-us/quality.svg',
      iconSize: 50,
    },
    {
      title: t('delivery'),
      description: t('delivery-description'),
      icon: '/assets/illustrations/about-us/delivery.svg',
      iconSize: 50,
    },
    {
      title: t('support'),
      description: t('support-description'),
      icon: '/assets/illustrations/about-us/support.svg',
      iconSize: 50,
    },
  ]

  return (
    <div className="max-width-container">
      <div className="grid place-items-center gap-2 pb-20 text-center">
        <p className="mb-10 text-2xl font-bold">من نحن – شركة أترجة</p>
        <span className="w-full text-justify text-sm leading-9 font-medium md:w-[90%] md:text-right lg:w-2/3">
          أترجة (Ottroja) هي شركة مصرية متخصصة في إنتاج وتوزيع المنتجات الطبيعية مثل الأعسال والزيوت
          الطبيعية والمكملات الغذائية الطبيعية ، تأسست عام 2015 م / 1437 هـ ، انطلقت رحلتنا من إيمان
          وثقة بأن ما يخرج من الطبيعة الصافية ، يستحق أن يصل للناس كما هو نقيًا ، نافعًا ، دون أي
          إضافات أو تلاعب .
        </span>
        <span className="w-full text-justify text-sm leading-9 font-bold md:w-[90%] md:text-right lg:w-2/3">
          اسم &quot; أترجة &quot; : لم يُختَر هذا الاسم عشوائيًا ، بل يحمل في معناه روح الشركة
          وقيمها.
        </span>
        <span className="w-full text-justify text-sm leading-9 font-medium md:w-[90%] md:text-right lg:w-2/3">
          اسم &quot; أترجة &quot; : مستوحًى من حديث النبي ﷺ : &quot;مثل المؤمن الذي يقرأ القرآن مثل
          الأترجة ، ريحها طيب وطعمها طيب&quot; وهذا هو ما نطمح إليه : أن تكون منتجاتنا طيبة في
          المظهر، والمحتوى، والأثر.
        </span>
        <span className="w-full text-justify text-sm leading-9 font-medium md:w-[90%] md:text-right lg:w-2/3">
          ما هي الأترجة : الأترجة هي نوع من الحمضيات ، تُعرف في بعض البلاد باسم
          &quot;الاترج&quot; أو &quot;الترنج&quot;، وتُشبه الليمون أو اليوسفي في شكلها ، لكنها أكبر
          حجمًا وأكثر طيبًا في الرائحة ، ذُكرت في كتب الطب النبوي والطب القديم لما لها من فوائد
          كثيرة ، وكانت تُعد رمزًا للنقاء والبركة.
        </span>
        <span className="w-full text-justify text-sm leading-9 font-medium md:w-[90%] md:text-right lg:w-2/3">
          لماذا أترجة ؟ كما تجمع الأترجة بين الطيب في الشكل والطعم والراحة ، تسعى شركة
          &quot;أترجة&quot; لأن تعكس نفس القيم: نقاء المنتج ، صدق المصدر، وعمق الفائدة.
        </span>
      </div>
      <div className="grid place-items-center gap-10 pb-20 text-center">
        <p className="text-2xl font-bold">رؤيتنا</p>
        <span className="w-full text-justify text-sm leading-9 font-medium md:w-[90%] md:text-right lg:w-2/3">
          أن نكون من الشركات الرائدة في مجال المنتجات الطبيعية حول العالم ومرجعًا للمنتجات والمكملات
          الغذائية الطبيعية ، بمستوى من الجودة يجعلنا أقرب للبيت من مجرد علامة تجارية فنحن لا نلعب
          دورًا تجاريًا فقط ولكن دورًا توعويًا ومعرفيًا أيضًا .
        </span>
      </div>
      <div className="grid place-items-center gap-10 pb-20 text-center">
        <p className="text-2xl font-bold">رسالتنا</p>
        <span className="w-full text-justify text-sm leading-9 font-medium md:w-[90%] md:text-right lg:w-2/3">
          توفير منتجات طبيعية موثوقة ، تُنتَج وتُعبَّأ وفق أعلى المعايير، لتصل إلى المستهلك بنقائها
          الكامل ، وتُعبّر عن التزامنا بالشفافية والجودة ، والصدق – وخلق وعي كامل بأهمية المنتجات
          والمكملات الطبيعية في ثقافة المجتمع العربي.
        </span>
      </div>
      <div className="grid place-items-center gap-10 pb-20 text-center">
        <p className="text-2xl font-bold">أهدافنا</p>
        <span className="w-full text-justify text-sm leading-9 font-medium md:w-[90%] md:text-right lg:w-2/3">
          1 - تقديم منتجات طبيعية 100 % بجودة عالية وثابته بشفافية وواقعية.
          <br />
          2 - أن تصل المنتجات الطبيعية النقية إلى كل بيت ومنزل عربي.
          <br />
          3 - تثقيف المستهلك حول الفرق بين العسل الطبيعي والمغشوش ، والزيت النقي والمُعدَّل ،
          والمكمل الغذائي الطبيعي والمصنع و تقديم محتوى مفيد ونافع حول المنتجات الطبيعية.
          <br />4 - الحفاظ على علاقة تقوم على الثقة المتبادلة مع كل عميل.
        </span>
      </div>
      <div className="grid grid-cols-1 gap-x-10 gap-y-20 py-10 md:grid-cols-2 lg:gap-x-20">
        {itemsList.map((item) => (
          <div
            key={item.title}
            className="bg-filter-trigger relative grid gap-3 rounded-sm px-5 pt-20 pb-10 drop-shadow-sm"
          >
            <div className="bg-primary/60 absolute start-5 -top-10 h-18 w-18 content-center justify-items-center rounded-sm">
              <Image src={item.icon} alt="" width={item.iconSize} height={item.iconSize} />
            </div>
            <div>
              <p className="pb-4 text-sm font-bold">{item.title}</p>
              <p className="text-xs leading-9 font-medium">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WhyChooseUs
