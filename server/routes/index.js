var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
  APIs = [{
    name: "dummy api",
    description: "dummy api for users",
    URIs:
      [
        {
          uri: "GET : /users/getAll",
          description: "get all users"
        }, {
          uri: "GET : /users/get/:id",
          description: "get user with id"
        },
        {
          uri: "POST : /users",
          description: "add a user"
        },
        {
          uri: "DELETE : /users/id",
          description: "delete a user"
        }
      ]
  },
  {
    name: "VURBO",
    description: "Labore voluptate enim in ad nostrud enim id sint ad sit cupidatat est cillum.",
    URIs: [
      {
        uri: "GET : /Amtas/getAll",
        description: "get all"
      },
      {
        uri: "GET : /Genmy/getAll",
        description: "get all"
      }
    ]
  },
  {
    name: "ISOLOGIX",
    description: "Ut pariatur ullamco proident duis enim est commodo occaecat minim consectetur.",
    URIs: [
      {
        uri: "GET : /Norsul/getAll",
        description: "get all"
      }
    ]
  },
  {
    name: "EXTREMO",
    description: "Ut irure ipsum reprehenderit in deserunt mollit tempor exercitation aute qui ullamco occaecat.",
    URIs: [
      {
        uri: "GET : /Zenthall/getAll",
        description: "get all"
      },
      {
        uri: "GET : /Gluid/getAll",
        description: "get all"
      },
      {
        uri: "GET : /Digirang/getAll",
        description: "get all"
      },
      {
        uri: "GET : /Geeky/getAll",
        description: "get all"
      },
      {
        uri: "GET : /Kiosk/getAll",
        description: "get all"
      }
    ]
  },
  {
    name: "LOVEPAD",
    description: "Exercitation irure minim nisi occaecat quis dolor officia amet.",
    URIs: [
      {
        uri: "GET : /Delphide/getAll",
        description: "get all"
      },
      {
        uri: "GET : /Terascape/getAll",
        description: "get all"
      },
      {
        uri: "GET : /Flyboyz/getAll",
        description: "get all"
      },
      {
        uri: "GET : /Zoinage/getAll",
        description: "get all"
      }
    ]
  },
  {
    name: "POOCHIES",
    description: "Anim nisi magna magna irure cupidatat.",
    URIs: [
      {
        uri: "GET : /Roboid/getAll",
        description: "get all"
      },
      {
        uri: "GET : /Zillanet/getAll",
        description: "get all"
      }
    ]
  },
  {
    name: "CALCULA",
    description: "Lorem nulla eiusmod pariatur id ipsum mollit ipsum aliqua reprehenderit excepteur enim id.",
    URIs: [
      {
        uri: "GET : /Uniworld/getAll",
        description: "get all"
      },
      {
        uri: "GET : /Geekol/getAll",
        description: "get all"
      },
      {
        uri: "GET : /Micronaut/getAll",
        description: "get all"
      }
    ]
  },
  {
    name: "DREAMIA",
    description: "Et nostrud in elit deserunt laborum aliquip in ullamco non adipisicing deserunt.",
    URIs: [
      {
        uri: "GET : /Vendblend/getAll",
        description: "get all"
      },
      {
        uri: "GET : /Visualix/getAll",
        description: "get all"
      },
      {
        uri: "GET : /Cognicode/getAll",
        description: "get all"
      }
    ]
  },
  {
    name: "GOKO",
    description: "Elit cillum sit nisi velit mollit reprehenderit ut qui nisi officia velit voluptate velit.",
    URIs: [
      {
        uri: "GET : /Biflex/getAll",
        description: "get all"
      },
      {
        uri: "GET : /Opticall/getAll",
        description: "get all"
      }
    ]
  },
  {
    name: "VENOFLEX",
    description: "Incididunt proident deserunt cupidatat dolore elit sunt do est ea duis.",
    URIs: []
  },
  {
    name: "PHARMEX",
    description: "Adipisicing occaecat anim ullamco ut laboris et ipsum.",
    URIs: [
      {
        uri: "GET : /Asimiline/getAll",
        description: "get all"
      },
      {
        uri: "GET : /Xoggle/getAll",
        description: "get all"
      },
      {
        uri: "GET : /Artiq/getAll",
        description: "get all"
      },
      {
        uri: "GET : /Tubalum/getAll",
        description: "get all"
      },
      {
        uri: "GET : /Sulfax/getAll",
        description: "get all"
      }
    ]
  },
  {
    name: "HANDSHAKE",
    description: "Ex qui ullamco sunt veniam consectetur consequat irure.",
    URIs: [
      {
        uri: "GET : /Bezal/getAll",
        description: "get all"
      },
      {
        uri: "GET : /Gadtron/getAll",
        description: "get all"
      }
    ]
  },
  {
    name: "SYBIXTEX",
    description: "Culpa deserunt culpa exercitation ad irure reprehenderit veniam sit sit dolor enim exercitation.",
    URIs: [
      {
        uri: "GET : /Ziore/getAll",
        description: "get all"
      },
      {
        uri: "GET : /Cytrek/getAll",
        description: "get all"
      },
      {
        uri: "GET : /Isosure/getAll",
        description: "get all"
      },
      {
        uri: "GET : /Viasia/getAll",
        description: "get all"
      },
      {
        uri: "GET : /Isoternia/getAll",
        description: "get all"
      }
    ]
  },
  {
    name: "COMCUR",
    description: "Anim dolor amet aliqua adipisicing eu ea laboris veniam aliqua.",
    URIs: [
      {
        uri: "GET : /Applideck/getAll",
        description: "get all"
      },
      {
        uri: "GET : /Zentry/getAll",
        description: "get all"
      }
    ]
  },
  {
    name: "PORTALINE",
    description: "Velit veniam incididunt cillum aute occaecat velit nulla.",
    URIs: [
      {
        uri: "GET : /Twiggery/getAll",
        description: "get all"
      },
      {
        uri: "GET : /Immunics/getAll",
        description: "get all"
      }
    ]
  },
  {
    name: "NAMEBOX",
    description: "Et sint ipsum consectetur aliquip amet ea qui.",
    URIs: [
      {
        uri: "GET : /Magneato/getAll",
        description: "get all"
      }
    ]
  }
  ]
  res.send({ APIs })
});

module.exports = router;
