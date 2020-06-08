export default {
  home: {
    timesList: {
      caption: 'مواعيد صلاة الجمعة',
      time: 'الموعد {{index}}: {{time}}',
      places: 'الأماكن المتاحة {{places}}',
    },
  },
  signIn: {
    userForm: {
      caption: '!يرجى إدخال بياناتك لتسجيل الدخول',
      inputs: {
        firstName: {
          label: 'الاسم الاول',
          placeholder: 'ضع اسمك الأول',
          errors: {
            isRequired: 'الإسم الأول مطلوب',
          },
        },
        lastName: {
          label: 'اسم العائلة',
          placeholder: 'ضع اسمك الأخير',
          errors: {
            isRequired: 'إسم العائلة مطلوب',
          },
        },
        phoneNumber: {
          label: 'رقم الهاتف',
          placeholder: 'ضع رقم هاتفك',
          errors: {
            isRequired: 'رقم الهاتف مطلوب',
          },
        },
        rememberMe: {
          label: 'تذكرنى',
        },
      },
    },
    termsModal: {
      header: 'يرجى الموافقة لتتمكن من تسجيل الدخول',
      terms:
        'بفضل الله ومنه وكرمه أذن فى دخول بيوته فى جميع الصلوات وصلاة الجمعة أيضا مع الالتزام بالاحتياطات التى اصدرتها وزارة الصحة بدولة النمسا ، وهى كما يلى :  🌷أولاً: يحضر كل مصلٍ سجادة للصلاة خاصة به . 🌳ثانياً: يلبس كل مصل (Mask) أثناء دخوله وخروجه ويمكنه خلعه أثناء الصلاة ،كما يمكنه الوضوء بالمسجد. 🌷ثالثاً: يحرص كل مصل على الالتزام بمسافة 1 متر بينه وبين الآخرين لا يقل عن ذلك . 🌴رابعاً: لا يجوز لمن وجد أى أعراض لمرض ( لا قدر الله ) أن يأتى الى المسجد حرصا على سلامة غيره!!. 🌳خامساً: لا مانع من احضار الصغار بشرط ان يكونوا ممن يحسن أدب المسجد ولا يشوشوا على المصلين. 🌷سادساً: كل من يلتزم هذه الإرشادات ينوى الطاعة لله بحفاظه على بيته وابراز محاسن الدين الحنيف . 🌳سابعاً: حرصك على النظام دليل ايمانك ومظهر عظيم لدينك فاحرص عليه حفظك الله ورعاك وتقبل منا ومنك!.💐🌴🌳🌷',
    },
  },
  control: {
    info: {
      caption: 'متبقي لصلاة الجمعة',
    },
  },
  actions: {
    refresh: 'إعادة تحميل',
    signIn: 'تسجيل الدخول',
    signOut: 'تسجيل الخروج',
    select: 'اختار',
    agree: 'موافق',
    disagree: 'لا أوافق',
  },
};
