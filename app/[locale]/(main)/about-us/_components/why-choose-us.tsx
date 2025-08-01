import Image from 'next/image'

function WhyChooseUs() {
  const itemsList = [
    {
      title: 'من نحن – شركة أترجة',
      description: (
        <>
          <strong>أترجة (Ottroja)</strong> هي شركة مصرية متخصصة في إنتاج وتوزيع <em>المنتجات الطبيعية</em> مثل الأعسال والزيوت الطبيعية والمكملات الغذائية الطبيعية ، تأسست عام <strong>2015 م / 1437 هـ</strong> ، انطلقت رحلتنا من إيمان وثقة بأن ما يخرج من <em>الطبيعة الصافية</em> ، يستحق أن يصل للناس كما هو <strong>نقيًا ، نافعًا</strong> ، دون أي إضافات أو تلاعب.
          <br /><br />
          اسم <strong>&ldquo; أترجة &rdquo;</strong> : لم يُختَر هذا الاسم عشوائيًا ، بل يحمل في معناه <em>روح الشركة وقيمها</em>.
        </>
      ),
      icon: '/assets/illustrations/about-us/pack.svg',
      iconSize: 40,
    },
    {
      title: 'رؤيتنا',
      description: (
        <>
          أن نكون من <strong>الشركات الرائدة</strong> في مجال <em>المنتجات الطبيعية</em> حول العالم ومرجعًا للمنتجات والمكملات الغذائية الطبيعية ، بمستوى من الجودة يجعلنا <strong>أقرب للبيت</strong> من مجرد علامة تجارية فنحن لا نلعب دورًا تجاريًا فقط ولكن دورًا <em>توعويًا ومعرفيًا</em> أيضًا.
        </>
      ),
      icon: '/assets/illustrations/about-us/quality.svg',
      iconSize: 50,
    },
    {
      title: 'رسالتنا',
      description: (
        <>
          توفير <strong>منتجات طبيعية موثوقة</strong> ، تُنتَج وتُعبَّأ وفق <em>أعلى المعايير</em>، لتصل إلى المستهلك <strong>بنقائها الكامل</strong> ، وتُعبّر عن التزامنا بـ<em>الشفافية والجودة ، والصدق</em> – وخلق وعي كامل بأهمية المنتجات والمكملات الطبيعية في <strong>ثقافة المجتمع العربي</strong>.
        </>
      ),
      icon: '/assets/illustrations/about-us/delivery.svg',
      iconSize: 50,
    },
    {
      title: 'أهدافنا',
      description: (
        <ol className="list-decimal list-inside space-y-3">
          <li>تقديم <em>منتجات طبيعية 100 %</em> بجودة عالية وثابته بشفافية وواقعية.</li>
          <li>أن تصل <em>المنتجات الطبيعية النقية</em> إلى كل بيت ومنزل عربي.</li>
          <li>تثقيف المستهلك حول الفرق بين <em>العسل الطبيعي والمغشوش</em> ، والزيت النقي والمُعدَّل ، والمكمل الغذائي الطبيعي والمصنع و تقديم <strong>محتوى مفيد ونافع</strong> حول المنتجات الطبيعية.</li>
          <li>الحفاظ على علاقة تقوم على <em>الثقة المتبادلة</em> مع كل عميل.</li>
        </ol>
      ),
      icon: '/assets/illustrations/about-us/support.svg',
      iconSize: 50,
    },
  ]

  return (
    <div className="max-width-container">
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
              <p className="pb-4 text-base font-bold">{item.title}</p>
              <div className="text-sm leading-7 font-medium">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WhyChooseUs