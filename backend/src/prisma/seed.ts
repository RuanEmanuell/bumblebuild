async function seedPart(data: any) {
  const response = await fetch("http://localhost:3000/parts/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  console.log(`Criado: ${data.name} (${data.type}) ->`, result);
}

const parts = [
  {
    name: "GeForce RTX 3050 8GB MSI",
    brand: "NVIDIA",
    price: 1400.00,
    type: "GPU",
    imageUrl: "https://m.media-amazon.com/images/I/71MF4X2-XWL._AC_SX679_.jpg",
    priceLink: "https://www.amazon.com.br/MSI-GeForce-Express-1492MHz-14000MHz/dp/B0CSPRNRZC",
    gpu: {
      create: {
        memoryGB: 8,
        memoryType: "GDDR6",
        tdp: 130,
        lengthMM: 242,
      },
    },
  },
  {
    name: "Geforce RTX 4060 Galax 1-Click OC",
    brand: "NVIDIA",
    price: 1900.00,
    type: "GPU",
    imageUrl: "https://images1.kabum.com.br/produtos/fotos/770131/placa-de-video-galax-geforce-rtx-4060-1-click-oc-2x-gen2_1749640502_g.jpg",
    priceLink: "https://www.kabum.com.br/produto/770131",
    gpu: {
      create: {
        memoryGB: 8,
        memoryType: "GDDR6",
        tdp: 115,
        lengthMM: 251,
      },
    },
  },
  {
    name: "RX 9070 XT Quicksilver XFX",
    brand: "AMD",
    price: 3300.00,
    type: "GPU",
    imageUrl: "https://images3.kabum.com.br/produtos/fotos/725943/placa-de-video-xfx-quicksilver-rx-9070-xt-gaming-edition-with-16gb-amd-radeon-gddr6-hdmi-3xdp-rdna-4-rx-97tqickb9_1741279478_g.jpg",
    priceLink: "https://www.kabum.com.br/produto/725943",
    gpu: {
      create: {
        memoryGB: 16,
        memoryType: "GDDR6",
        tdp: 270,
        lengthMM: 320,
      },
    },
  },
  {
    name: "Ryzen 7 5700X",
    brand: "AMD",
    price: 1100.00,
    type: "CPU",
    imageUrl: "https://m.media-amazon.com/images/I/51gRv8z+K6L._AC_SY879_.jpg",
    priceLink: "https://www.amazon.com.br/PROCESSADOR-AMD-5700X-100-100000926WOF-Cer%C3%A2mica/dp/B09VCHQHZ6",
    cpu: {
      create: {
        socket: "AM4",
        cores: 8,
        threads: 16,
        frequency: 3.4,
        tdp: 65,
        integratedGraphics: false,
      },
    },
  },
  {
    name: "Core i5 12400F",
    brand: "Intel",
    price: 1050.00,
    type: "CPU",
    imageUrl: "https://m.media-amazon.com/images/I/51DY7a--LrL._AC_SX679_.jpg",
    priceLink: "https://www.amazon.com.br/Processador-Intel-i5-12400-N%C3%BAcleos-BX8071512400/dp/B09MDH6B1P",
    cpu: {
      create: {
        socket: "LGA1700",
        cores: 6,
        threads: 12,
        frequency: 2.5,
        tdp: 65,
        integratedGraphics: false,
      },
    },
  },
    {
    name: "Core i5 12400F",
    brand: "Intel",
    price: 1050.00,
    type: "CPU",
    imageUrl: "https://m.media-amazon.com/images/I/51DY7a--LrL._AC_SX679_.jpg",
    priceLink: "https://www.amazon.com.br/Processador-Intel-i5-12400-N%C3%BAcleos-BX8071512400/dp/B09MDH6B1P",
    cpu: {
      create: {
        socket: "LGA1700",
        cores: 6,
        threads: 12,
        frequency: 2.5,
        tdp: 65,
        integratedGraphics: false,
      },
    },
  },
  {
    name: "SSD Plus 480GB",
    brand: "Sandisk",
    price: 180.00,
    type: "SSD",
    imageUrl: "https://m.media-amazon.com/images/I/51OHIGS4wtL._AC_SX679_.jpg",
    priceLink: "https://www.amazon.com.br/Sandisk-480GB-Leitura-Grava%C3%A7%C3%A3o-SDSSDA-480G-G26/dp/B01F9G46Q8",
    ssd: {
      create: {
        capacityGB: 480,
        type: "SATA",
        readMBs: 550,
        writeMBs: 500,
      },
    },
  },
  {
    name: "NV3 1TB",
    brand: "Kingston",
    price: 380.00,
    type: "SSD",
    imageUrl: "https://m.media-amazon.com/images/I/71ZnK38jZzL._AC_SX679_.jpg",
    priceLink: "https://www.amazon.com.br/Kingston-2280-NVMe-SNV3S-1000G/dp/B0DBR3DZWG",
    ssd: {
      create: {
        capacityGB: 1000,
        type: "NVMe",
        readMBs: 3500,
        writeMBs: 2800,
      },
    },
  },
  {
    name: "MAG A650BN 650W",
    brand: "MSI",
    price: 310.00,
    type: "PSU",
    imageUrl: "https://m.media-amazon.com/images/I/81eLlIQ5PsL._AC_SX679_.jpg",
    priceLink: "https://www.amazon.com.br/Fonte-650w-Msi-Mag-A650bn/dp/B0991TZ399",
    psu: {
      create: {
        powerW: 650,
        certification: "80 Plus Bronze",
        modular: false,
      },
    },
  },
  {
    name: "Mancer Narok Mid-Tower",
    brand: "Mancer",
    price: 270.00,
    type: "CASE",
    imageUrl: "https://m.media-amazon.com/images/I/61xaQ1+MVFL._AC_SX679_.jpg",
    priceLink: "https://www.amazon.com.br/Gabinete-Mancer-Mid-Tower-Lateral-MCR-NRK-RGB01/dp/B0CVN692HC",
    case: {
      create: {
        supportedSizes: "ATX, Micro-ATX, Mini-ITX",
        maxGpuLengthMM: 330,
      },
    },
  },
  {
    name: "B650M Gaming Wifi",
    brand: "Gigabyte",
    price: 850.00,
    type: "MOTHERBOARD",
    imageUrl: "https://m.media-amazon.com/images/I/61bqSMeAWGL._AC_SX679_.jpg",
    priceLink: "https://www.amazon.com.br/Placa-Gigabyte-B650M-Gaming-Chipset/dp/B0D5NM5184",
    motherboard: {
      create: {
        socket: "AM5",
        chipset: "B650",
        ramType: "DDR5",
        slots: 4,
        maxRAM: 128,
        size: "Micro-ATX",
      },
    },
  },
  {
    name: "MSI H510M-B",
    brand: "MSI",
    price: 490.00,
    type: "MOTHERBOARD",
    imageUrl: "https://m.media-amazon.com/images/I/819z15YzcIL._AC_SX679_.jpg",
    priceLink: "https://www.amazon.com.br/PLACA-MSI-H510M-B-DDR4-GERACAO/dp/B09Y1BCPNC",
    motherboard: {
      create: {
        socket: "LGA1700",
        chipset: "H510",
        ramType: "DDR4",
        slots: 2,
        maxRAM: 64,
        size: "Micro-ATX",
      },
    },
  },
  {
    name: "Hyper 212 Black",
    brand: "CoolerMaster",
    price: 210.00,
    type: "COOLER",
    imageUrl: "https://m.media-amazon.com/images/I/71yaJKTZ7IL._AC_SX679_.jpg",
    priceLink: "https://www.amazon.com.br/Cooler-Hyper-Black-CoolerMaster-RR-212S-20PK-R1/dp/B07H25DYM3",
    cooler: {
      create: {
        type: "Air Cooler",
        socketSupport: "Intel LGA 1200/115x, AMD AM4",
      },
    },
  },
];

(async () => {
  for (const part of parts) {
    await seedPart(part);
  }
})();
