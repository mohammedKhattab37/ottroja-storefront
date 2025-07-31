export default function ReturnPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8 pb-16 max-w-4xl">
      <div className="p-8">
        <h1 className="text-3xl font-bold text-primary mb-8 text-center">
          سياسة الاستبدال والاسترجاع
        </h1>
        
        <div className="prose prose-lg max-w-none text-right" dir="rtl">
          <div className="space-y-6">
            <section>
              <p className="text-foreground leading-relaxed">
                في Ottroja، نسعى دوماً لرضا عملائنا، لذلك نقدم سياسة استرجاع واستبدال مرنة وواضحة، مع التزامنا الكامل بالجودة.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">سياسة الاسترجاع العامة</h2>
              <p className="text-foreground leading-relaxed">
                يحق للعميل إرجاع المنتج خلال 3 أيام من استلام الطلب، بشرط أن يكون سليماً وبحالته الأصلية دون فتح أو استخدام.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">لا تشمل سياسة الإرجاع العروض</h2>
              <div className="space-y-3">
                <p className="text-foreground leading-relaxed">
                  المنتجات المباعة بعروض (المصدرة) غير قابلة للإرجاع، وفي حالة عدم استلام الطلب بسبب الرسوم الجمركية أو غيرها، 
                  يتم خصم تكاليف الشحن والرسوم الجمركية من المبلغ المسترد.
                </p>
                <p className="text-foreground leading-relaxed">
                  لا يمكن إرجاع المنتجات المشتراة عبر منصات أخرى، وتخضع لسياسات المنصة الأصلية.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">تكاليف الاسترجاع</h2>
              <p className="text-foreground leading-relaxed">
                في حالة الإرجاع عبر شركة شحن: تُضاف 50 جنيه إضافية، وتُخصم من المبلغ المسترد أو تُضاف كرصيد في المتجر.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">سياسة الاستبدال</h2>
              <div className="space-y-3">
                <p className="text-foreground leading-relaxed">
                  وعند الاستبدال لأي سبب متعلق بالعميل يتم تحصيل رسوم شحن إضافية.
                </p>
                <p className="text-foreground leading-relaxed">
                  يحق للعميل استبدال المنتج خلال 3 أيام من تاريخ الاستلام، بشرط أن يكون في حالته الأصلية.
                </p>
                <p className="text-foreground leading-relaxed">
                  في حالة الرغبة بالاستبدال، يتم دفع رسوم شحن إضافية.
                </p>
                <p className="text-foreground leading-relaxed font-medium">
                  الطلبات الدولية غير قابلة للاستبدال.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">المنتجات التي لا يشملها الاسترجاع أو الاستبدال</h2>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                <li>المنتجات المفتوحة</li>
                <li>العينات الترويجية</li>
                <li>العروض المجمعة</li>
                <li>المنتجات المتجرة</li>
                <li>العينات الترويجية</li>
                <li>العروض المجمعة</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">العيوب المصنعية</h2>
              <p className="text-foreground leading-relaxed">
                في حالة وجود عيب مصنعي واضح، يمكن الاسترجاع خلال مدة الصلاحية المدونة على العبوة أو المنتج، بشرط عدم 
                استخدامه واحتفاظه بحالته الأصلية.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">خطوات التواصل</h2>
              <p className="text-foreground leading-relaxed">
                يتم التواصل عبر نفس المنصة التي تمت منها عملية الشراء لطلب الاستبدال أو الاسترجاع – أو على رقم 01551733903
              </p>
            </section>

            <section className="bg-muted/30 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-primary mb-4">ملاحظات مهمة</h3>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                <li>جميع عمليات الإرجاع والاستبدال تخضع للمراجعة والموافقة من قبل فريق خدمة العملاء</li>
                <li>يُرجى الاحتفاظ بالفاتورة الأصلية وتغليف المنتج عند طلب الإرجاع أو الاستبدال</li>
                <li>مدة معالجة طلبات الإرجاع قد تستغرق من 3-7 أيام عمل</li>
                <li>المبالغ المستردة ستتم إلى نفس وسيلة الدفع المستخدمة في الشراء</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-medium text-secondary mt-8 mb-4">تواصل معنا</h3>
              <div className="space-y-2">
                <p className="text-foreground">
                  للاستفسارات حول سياسة الاسترجاع والاستبدال:
                </p>
                <p className="text-foreground">
                  البريد الإلكتروني: 
                  <a href="mailto:Ottrojafood@gmail.com" className="text-primary hover:underline mr-2">
                    Ottrojafood@gmail.com
                  </a>
                </p>
                <p className="text-foreground">
                  رقم الهاتف: 
                  <a href="tel:01551733903" className="text-primary hover:underline mr-2">
                    01551733903
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}