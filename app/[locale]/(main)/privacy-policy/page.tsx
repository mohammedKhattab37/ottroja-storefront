import { useLocale, useTranslations } from 'next-intl'

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8 pb-16 max-w-4xl">
      <div className="p-8">
        <h1 className="text-3xl font-bold text-primary mb-8 text-center">
          سياسة الاستخدام والخصوصية
        </h1>
        
        <div className="prose prose-lg max-w-none text-right" dir="rtl">
          <div className="space-y-6">
            <section>
              <p className="text-foreground leading-relaxed">
                في Ottroja، نحرص على حماية خصوصيتك وبياناتك الشخصية بأقصى درجات الأمان، وبقبولك لسياسة الخصوصية 
                الخاصة بعملاء Ottroja، إنك توافق على جمع معلوماتك الشخصية واستخدامها بما يتوافق مع هذه السياسة وبما يخدم 
                عملياتك داخل الموقع، بما في ذلك إرسال العروض والمنتجات الجديدة حال موافقتك على ذلك، ونؤكد أنه لن يتم بيع أو 
                مشاركة أو عرض بياناتك الشخصية لأي جهة خارجية.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">إنشاء الحساب</h2>
              <p className="text-foreground leading-relaxed">
                عند فتح حساب جديد في food.Ottroja، نطلب منك إدخال بعض البيانات الشخصية الضرورية لإتمام عملية التسجيل 
                والتأكد من هويتك والعمر. وهي من أهم معلومات مطلوبة.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">وصف المنتجات</h2>
              <p className="text-foreground leading-relaxed">
                في إطار سياسة الإرجاع المعتمدة في حالة أن المنتج المستلم مختلف أو عن الوصف المنشور في الموقع، يمكنك إرجاع المنتج وفقاً 
                لشروط سياسة الإرجاع لدينا.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">معلومات التسعير وقبول الطلبات</h2>
              <p className="text-foreground leading-relaxed">
                نحتفظ في Ottroja بحق إلغاء أو رفض أي طلب في حالة وجود خطأ في التسعير أو في تفاصيل المنتج، ويتم إشعارك بذلك 
                عبر البريد الإلكتروني كما نحتفظ بحق تصحيح أي أخطاء في الأسعار وفقاً لتقديرنا.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">المعلومات المالية</h2>
              <p className="text-foreground leading-relaxed">
                عند استخدامك لوسائل الدفع كبطاقات الائتمان / الخصم أو الحسابات البنكية أو الدفع عند الاستلام، إن معلوماتك المالية 
                تخضع لأقصى درجات الأمان لمنع الاحتيال أو إساءة الاستخدام، وتُحفظ بطريقة مشفّرة على خوادم غير متصلة بالإنترنت.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">الاستخدام الداخلي للمعلومات</h2>
              <p className="text-foreground leading-relaxed">
                نقوم في Ottroja بجمع وتخزين ومعالجة بياناتك على خوادمنا المحمية على مدار الساعة ونستخدم هذه البيانات لتفعيل 
                حسابك، تنفيذ طلباتك، وتقديم خدماتنا لك بكفاءة وأمان.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">الطلبات</h2>
              <p className="text-foreground leading-relaxed">
                نحتفظ في Ottroja بحق رفض أو إلغاء أي طلب لأي سبب كان وفي أي وقت وقد نطلب منك تقديم معلومات إضافية مثل 
                رقم الهاتف أو العنوان قبل اعتماد الطلب.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">حماية بياناتك</h2>
              <p className="text-foreground leading-relaxed">
                نلتزم في Ottroja بالحفاظ على سرية وأمان معلوماتك، ونؤكد على ضرورة عدم مشاركة بيانات دخول حسابك مع أي 
                جهة وفي حال شعرت أن بياناتك قد تم كشفها، يُرجى تغيير كلمة مرور الدخول لحسابك من خلال حسابك.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-secondary mt-8 mb-4">تواصل معنا</h3>
              <p className="text-foreground">
                للاستفسارات حول سياسة الخصوصية، يمكنك التواصل معنا عبر البريد الإلكتروني: 
                <a href="mailto:Ottrojafood@gmail.com" className="text-primary hover:underline mr-2">
                  Ottrojafood@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}