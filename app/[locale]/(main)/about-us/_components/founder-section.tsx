import Image from 'next/image'

function FounderSection({ t, direction }: { t: (key: string) => string; direction: string }) {
  return (
    <div
      className="max-width-wrapper grid justify-items-center gap-10 p-2 sm:p-10 md:p-0 lg:flex lg:gap-20"
      dir={direction}
    >
      <Image
        src={'/assets/founder.svg'}
        width={800}
        height={800}
        alt="founder"
        className="h-[85%] w-full max-w-[30rem]"
      />
      <div>
        <p className="pb-10 text-xl font-bold">المؤسس والمدير التنفيذي لشركة أترجة</p>
        <div className="grid gap-2.5 font-medium">
          <p>{t('founder-name')}</p>
          <span className="text-justify text-sm leading-9 sm:text-start">
            يمتلك المهندس محمد خطاب شغفًا قديمًا بمجال المنتجات الطبيعية ، بدأ معه منذ سنوات دراسته
            ، حيث اهتم مبكرًا بفهم خصائص الأعسال ، وأصول الجودة في المنتجات الطبيعية ، وما يرتبط بها
            من فوائد غذائية وصحية حقيقية مدفوعًا بهذا الشغف ليقضى سنوات في البحث والتجربة ليبني
            فهمًا دقيقًا للجودة من المنبع، لا من المظهر.
          </span>
          <span className="text-justify text-sm leading-9 sm:text-start">
            في عام 2015 ، أسّس شركة &quot; أترجة &quot; برؤية واضحة : تقديم منتجات طبيعية موثوقة ،
            تلتزم بأعلى المعايير، وتُنتج بشفافية واهتمام بكل تفصيلة.
          </span>
          <span className="text-justify text-sm leading-9 sm:text-start">
            ورغم نمو الشركة واتساع نطاقها، يحرص محمد خطاب على البقاء قريبًا من عملائه ، ويتابع بنفسه
            مردود المنتجات وتجارب المستخدمين داخل وخارج مصر، إيمانًا منه بأن الجودة لا تكتمل إلا
            بثقة المستهلك ورضاه الحقيقي.
          </span>
        </div>

        <div className="grid grid-cols-2 gap-10 py-10">
          <div className="grid gap-3">
            <p className="text-3xl font-bold">100K+</p>
            <p className="text-sm font-medium">{t('followers')}</p>
          </div>
          <div className="grid gap-3">
            <p className="text-3xl font-bold">98%</p>
            <p className="text-sm font-medium">{t('customers')}</p>
          </div>
          <div className="grid gap-3">
            <p className="text-3xl font-bold">95%</p>
            <p className="text-sm font-medium">{t('success')}</p>
          </div>
          <div className="grid gap-3">
            <p className="text-3xl font-bold">60K+</p>
            <p className="text-sm font-medium">{t('orders')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FounderSection
