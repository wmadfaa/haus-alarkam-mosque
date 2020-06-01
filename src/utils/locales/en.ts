export default {
  home: {
    timesList: {
      caption: 'Friday Prayer times',
      time: 'time {{index}}: {{time}}',
      places: '{{places}} places available',
    },
  },
  signIn: {
    userForm: {
      caption: 'Please Enter Your Data to Sign in!',
      inputs: {
        firstName: {
          label: 'First name',
          placeholder: 'Place your first name',
          errors: {
            isRequired: 'First name is required',
          },
        },
        lastName: {
          label: 'Last name',
          placeholder: 'Place your last name',
          errors: {
            isRequired: 'Last name is required',
          },
        },
        phoneNumber: {
          label: 'Phone number',
          placeholder: 'Place your phone number',
          errors: {
            isRequired: 'Phone number is required',
          },
        },
        rememberMe: {
          label: 'Remember me',
        },
      },
    },
    termsModal: {
      header: 'Please Agree to sign in',
      terms:
        'By the grace of Allah, and from him and his generosity, he authorized to enter his homes in all prayers and Friday prayers Also with commitment to the precautions issued by the Austrian Ministry of Health, They are as follows: First: Every worshiper attends a prayer rug of his own. Second: Each serum is worn (Mask) during its entry and exit and it can be removed during prayer He can perform ablution in the mosque. Third: Each serum is keen to adhere to a distance of 1 A meter between him and others is not less than that. Fourth: It is not permissible for anyone who finds any Symptoms of illness (God forbid) may come to the mosque in order to ensure the safety of others !!. Fifth: There is no objection to bringing the children, provided that they improve the literature of the mosque And do not confuse the worshipers. Sixth: Whoever abides by these instructions intends Obedience to God by preserving his home and highlighting the virtuous Mahasin ad-Din. Seventh: Your keenness on the system is evidence of your faith and a great manifestation of your religion, so make sure that God preserves you Take care of you and accept us and you! 💐🌴🌳🌷',
    },
  },
  control: {
    info: {
      caption: 'remaining for the Friday prayer time',
    },
  },
  actions: {
    refresh: 'Refresh',
    signIn: 'Sign in',
    signOut: 'Sign out',
    SelectAnotherTime: 'Select another time',
    select: 'Select',
    agree: 'Agree',
    disagree: 'Disagree',
  },
};
