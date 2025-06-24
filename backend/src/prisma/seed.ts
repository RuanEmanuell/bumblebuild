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
    "name": "Thunder 500W Bronze",
    "brand": "Mancer",
    "type": "PSU",
    "priceLink": "https://www.pichau.com.br/fonte-mancer-thunder-500w-bronze-80-plus-mcr-thr500-bl01",
    "psu": {
      "create": {
        "powerW": 500,
        "certification": "80 Plus Bronze",
        "modular": false
      }
    }
  },
  {
    "name": "SU650 240GB",
    "brand": "ADATA",
    "type": "SSD",
    "priceLink": "https://www.terabyteshop.com.br/produto/10527/ssd-adata-su650-240gb-asu650ss-240gt-r-sata-6gbs-25-pol-leitura-520mbs-gravacao-450mbs",
    "ssd": {
      "create": {
        "capacityGB": 240,
        "type": "SATA",
        "readMBs": 520,
        "writeMBs": 450
      }
    }
  },
  {
    "name": "T-Dagger Cube White",
    "brand": "T-Dagger",
    "type": "CASE",
    "priceLink": "https://www.kabum.com.br/produto/108089/gabinete-gamer-t-dagger-cube-white-mid-tower-lateral-em-vidro-branco-t-tgc305w",
    "case": {
      "create": {
        "supportedSizes": "ATX, Micro-ATX, Mini-ITX",
        "maxGpuLengthMM": 350
      }
    }
  },
  {
    "name": "Acegeek Blade Mid Tower",
    "brand": "Acegeek",
    "type": "CASE",
    "priceLink": "https://www.pichau.com.br/gabinete-gamer-acegeek-blade-mid-tower-lateral-de-vidro-preto-ag-blade-bk",
    "case": {
      "create": {
        "supportedSizes": "ATX, Micro-ATX, Mini-ITX",
        "maxGpuLengthMM": 340
      }
    }
  },
  {
    "name": "Gamdias Boreas E1-410 Red 120mm",
    "brand": "Gamdias",
    "type": "COOLER",
    "priceLink": "https://www.terabyteshop.com.br/produto/25350/cooler-processador-gamdias-boreas-e1-410-red-120mm-intel-amd-boreas-e1-410-red",
    "cooler": {
      "create": {
        "type": "Air Cooler",
        "socketSupport": "Intel & AMD"
      }
    }
  },
  {
    "name": "Thermalright Assassin X 120 R SE ARGB Black",
    "brand": "Thermalright",
    "type": "COOLER",
    "priceLink": "https://www.ciapc.com.br/hardware/cooler/para-processador/air-cooler-120mm-thermalright-assassin-x-120-r-se-argb-black-assassin-x-120-r-se",
    "cooler": {
      "create": {
        "type": "Air Cooler",
        "socketSupport": "Intel LGA 1200/115x, AMD AM4"
      }
    }
  },
  {
    "name": "Intel Core i3 14100F",
    "brand": "Intel",
    "type": "CPU",
    "priceLink": "https://www.terabyteshop.com.br/produto/27407/processador-intel-core-i3-14100f-35-ghz-47ghz-turbo-14-geracao-4-cores-8-threads-lga-1700-bx8071514100f",
    "cpu": {
      "create": {
        "socket": "LGA1700",
        "cores": 4,
        "threads": 8,
        "frequency": 3.5,
        "tdp": 65,
        "integratedGraphics": false
      }
    }
  },
  {
    "name": "AMD Ryzen 3 5300G",
    "brand": "AMD",
    "type": "CPU",
    "priceLink": "https://www.pichau.com.br/processador-amd-ryzen-3-5300g-4-core-8-threads-4-0ghz-4-2ghz-turbo-cache-8mb-am4-100-100000253box",
    "cpu": {
      "create": {
        "socket": "AM4",
        "cores": 4,
        "threads": 8,
        "frequency": 4.0,
        "tdp": 65,
        "integratedGraphics": true
      }
    }
  },
  {
    "name": "AMD Ryzen 3 4100",
    "brand": "AMD",
    "type": "CPU",
    "priceLink": "https://www.gigantec.com.br/processador-amd-ryzen-3-4100-am4-4-0ghz-6mb-cache-wraith-stealth-s-video-integrado-100-100000510box.html",
    "cpu": {
      "create": {
        "socket": "AM4",
        "cores": 4,
        "threads": 8,
        "frequency": 4.0,
        "tdp": 65,
        "integratedGraphics": true
      }
    }
  },
  {
    "name": "AMD Ryzen 5 4500",
    "brand": "AMD",
    "type": "CPU",
    "priceLink": "https://www.kabum.com.br/produto/333154/processador-amd-ryzen-5-4500-3-6ghz-4-1ghz-max-turbo-cache-11mb-am4-sem-video-100-100000644box",
    "cpu": {
      "create": {
        "socket": "AM4",
        "cores": 6,
        "threads": 12,
        "frequency": 3.6,
        "tdp": 65,
        "integratedGraphics": false
      }
    }
  },
  {
    "name": "ASRock Intel ARC A380 6GB Challenger ITX OC",
    "brand": "ASRock",
    "type": "GPU",
    "priceLink": "https://www.ciapc.com.br/placas-de-video/geforce/gpu-asrock-intel-arc-a380-6gb-challenger-itx-oc-gddr6-96-bits-3x-dp-1x-hdmi-a380-cli-6go",
    "gpu": {
      "create": {
        "memoryGB": 6,
        "memoryType": "GDDR6",
        "tdp": 75,
        "lengthMM": 170
      }
    }
  },
  {
    "name": "ASRock Radeon RX 6500 XT Phantom Gaming D OC 4GB",
    "brand": "ASRock",
    "type": "GPU",
    "priceLink": "https://www.terabyteshop.com.br/produto/20241/placa-de-video-asrock-radeon-rx-6500-xt-phantom-gaming-d-oc-4gb-gddr6-fsr-ray-tracing-90-ga3dzz-00uanf",
    "gpu": {
      "create": {
        "memoryGB": 4,
        "memoryType": "GDDR6",
        "tdp": 107,
        "lengthMM": 170
      }
    }
  },
  {
    name: "CX Series CX750 750W",
    brand: "Corsair",
    price: 449.90,
    type: "PSU",
    priceLink: "https://www.kabum.com.br/produto/516057/fonte-corsair-cx-series-cx750-750w-80-plus-bronze-com-cabo-preto-cp-9020279-br",
    psu: {
      create: {
        powerW: 750,
        certification: "80 Plus Bronze",
        modular: false,
      },
    },
  },
  {
    name: "XPG Core Reactor II 850W",
    brand: "XPG",
    price: 759.90,
    type: "PSU",
    priceLink: "https://www.kabum.com.br/produto/514896/fonte-xpg-core-reactor-ii-ve-850w-75261436",
    psu: {
      create: {
        powerW: 850,
        certification: "80 Plus Gold",
        modular: true,
      },
    },
  },
  {
    name: "Legion",
    brand: "TGT",
    price: 150.00,
    type: "CASE",
    priceLink: "https://www.amazon.com.br/Gabinete-TGT-Mid-Tower-Lateral-TGT-LGN-BK/dp/B0D6Z5MXBK/ref=asc_df_B0D6Z5MXBK?mcid=4d8ccc5ac6473572b550bcb339e5580a&hvadid=709884378154&hvpos=&hvnetw=g&hvrand=6472006341587123059&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9198625&hvtargid=pla-2320909064141&language=pt_BR",
    case: {
      create: {
        supportedSizes: "Micro-ATX, Mini-ITX",
        maxGpuLengthMM: 280,
      },
    },
  },
  {
    name: "MasterBox Q300L",
    brand: "Cooler Master",
    price: 399.90,
    type: "CASE",
    priceLink: "https://www.amazon.com.br/Gabinete-Cooler-Master-MasterBox-Transparente/dp/B0785GRMPG",
    case: {
      create: {
        supportedSizes: "Micro-ATX, Mini-ITX",
        maxGpuLengthMM: 360,
      },
    },
  },
  {
    name: "Galaxy Full Glass White Mid-Tower",
    brand: "Rise Mode",
    price: 429.90,
    type: "CASE",
    priceLink: "https://www.kabum.com.br/produto/527240/gabinete-gamer-rise-mode-galaxy-full-glass-mid-tower-atx-lateral-e-frente-em-vidro-temperado-branco-rm-ca-fg-w",
    case: {
      create: {
        supportedSizes: "ATX, Micro-ATX, Mini-ITX",
        maxGpuLengthMM: 370,
      },
    },
  },
  {
    name: "Vengeance 32GB (2x16GB) 5600MHz DDR5",
    brand: "Corsair",
    price: 899.90,
    type: "RAM",

    priceLink: "https://www.amazon.com.br/Corsair-Vengeance-2x16GB-PC5-41600-CMK32GX5M2B5200C40/dp/B09NCPTVX5",
    ram: {
      create: {
        capacityGB: 32,
        type: "DDR5",
        frequency: 5600,
      },
    },
  },
  {
    name: "Fury Beast 16GB 5600MHz DDR5",
    brand: "Kingston",
    price: 479.90,
    type: "RAM",
    priceLink: "https://www.kabum.com.br/produto/285967/memoria-ram-kingston-fury-beast-16gb-5600mhz-ddr5-cl40-para-intel-xmp-preto-kf556c40bb-16",
    ram: {
      create: {
        capacityGB: 16,
        type: "DDR5",
        frequency: 5600,
      },
    },
  },
  {
    name: "Fury Beast 8GB 3200MHz DDR4",
    brand: "Kingston",
    price: 159.90,
    type: "RAM",
    priceLink: "https://www.kabum.com.br/produto/172365/memoria-ram-kingston-fury-beast-8gb-3200mhz-ddr4-cl16-preto-kf432c16bb-8",
    ram: {
      create: {
        capacityGB: 8,
        type: "DDR4",
        frequency: 3200,
      },
    },
  },
  {
    name: "Z 16GB 3200MHz DDR4",
    brand: "Rise Mode",
    price: 259.90,
    type: "RAM",
    priceLink: "https://www.kabum.com.br/produto/383895/memoria-ram-rise-mode-z-16gb-3200mhz-ddr4-cl19-branco-rm-d4-16g-3200zw",
    ram: {
      create: {
        capacityGB: 16,
        type: "DDR4",
        frequency: 3200,
      },
    },
  },
  {
    name: "GeForce RTX 3050 6B MSI",
    brand: "NVIDIA",
    price: 1400.00,
    type: "GPU",
    priceLink: "https://www.amazon.com.br/MSI-GeForce-Express-1492MHz-14000MHz/dp/B0CSPRNRZC",
    gpu: {
      create: {
        memoryGB: 6,
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
    priceLink: "https://www.amazon.com.br/Gabinete-Mancer-Mid-Tower-Lateral-MCR-NRK-RGB01/dp/B0CVN692HC",
    case: {
      create: {
        supportedSizes: "ATX, Micro-ATX, Mini-ITX",
        maxGpuLengthMM: 330,
      },
    },
  },
  {
    name: "H410M-H V2",
    brand: "Gigabyte",
    type: "MOTHERBOARD",
    priceLink: "https://www.kabum.com.br/produto/212032/placa-mae-gigabyte-intel-lga-1200-ddr4-hdmi-d-sub-raid-m-2-usb-3-2-h410m-h",
    motherboard: {
      create: {
        socket: "LGA 1200",
        ramType: "DDR4",
        slots: 2,
        maxRAM: 64,
        size: "Micro-ATX",
      },
    },
  },
  {
    name: "B650M Gaming Wifi",
    brand: "Gigabyte",
    price: 850.00,
    type: "MOTHERBOARD",
    priceLink: "https://www.amazon.com.br/Placa-Gigabyte-B650M-Gaming-Chipset/dp/B0D5NM5184",
    motherboard: {
      create: {
        socket: "AM5",
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
    priceLink: "https://www.amazon.com.br/PLACA-MSI-H510M-B-DDR4-GERACAO/dp/B09Y1BCPNC",
    motherboard: {
      create: {
        socket: "LGA1700",
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
    priceLink: "https://www.amazon.com.br/Cooler-Hyper-Black-CoolerMaster-RR-212S-20PK-R1/dp/B07H25DYM3",
    cooler: {
      create: {
        type: "Air Cooler",
        socketSupport: "Intel LGA 1200/115x, AMD AM4",
      },
    },
  },
  {
    name: "Ryzen 5 7600",
    brand: "AMD",
    price: 1149.99,
    type: "CPU",
    priceLink: "https://www.kabum.com.br/produto/405799/processador-amd-ryzen-5-7600-5-1ghz-max-turbo-cache-38mb-am5-6-nucleos-video-integrado-100-100001015box",
    cpu: {
      create: {
        socket: "AM5",
        cores: 6,
        threads: 12,
        frequency: 5.1,
        tdp: 65,
        integratedGraphics: true,
      },
    },
  },
  {
    name: "Ryzen 5 8600G",
    brand: "AMD",
    price: 1579.90,
    type: "CPU",
    priceLink: "https://www.amazon.com.br/Processador-AMD-Ryzen-8600G-100100001237BOX/dp/B0CQ4GYTTX",
    cpu: {
      create: {
        socket: "AM5",
        cores: 6,
        threads: 12,
        frequency: 5.0,
        tdp: 65,
        integratedGraphics: true,
      },
    },
  },
  {
    name: "Ryzen 5 9600X",
    brand: "AMD",
    price: 1899.90,
    type: "CPU",
    priceLink: "https://www.amazon.com.br/PROCESSADOR-AM5-RYZEN-5-9600X/dp/B0D6NN6TM7",
    cpu: {
      create: {
        socket: "AM5",
        cores: 6,
        threads: 12,
        frequency: 5.4,
        tdp: 65,
        integratedGraphics: true,
      },
    },
  },
  {
    name: "Ryzen 5 5600",
    brand: "AMD",
    price: 699.90,
    type: "CPU",
    priceLink: "https://www.amazon.com.br/PROCESSADOR-AMD-5600-100-100000927BOX-Cerâmica/dp/B09VCHR1VH",
    cpu: {
      create: {
        socket: "AM4",
        cores: 6,
        threads: 12,
        frequency: 4.4,
        tdp: 65,
        integratedGraphics: false,
      },
    },
  },
  {
    name: "Ryzen 7 9700X",
    brand: "AMD",
    price: 2699.00,
    type: "CPU",
    priceLink: "https://www.amazon.com.br/PROCESSADOR-AM5-RYZEN-7-9700X/dp/B0D6NMDNNX",
    cpu: {
      create: {
        socket: "AM5",
        cores: 8,
        threads: 16,
        frequency: 5.5,
        tdp: 65,
        integratedGraphics: true,
      },
    },
  },
  {
    name: "Core i7 14700KF",
    brand: "Intel",
    price: 2799.99,
    type: "CPU",
    priceLink: "https://www.kabum.com.br/produto/497577/processador-intel-core-i7-14700kf-14-geracao-5-6-ghz-max-turbo-cache-33mb-20-nucleos-28-threads-lga1700-bx8071514700kf",
    cpu: {
      create: {
        socket: "LGA1700",
        cores: 20,
        threads: 28,
        frequency: 5.6,
        tdp: 125,
        integratedGraphics: false,
      },
    },
  },
  {
    name: "Core i5 14600KF",
    brand: "Intel",
    price: 1899.99,
    type: "CPU",
    priceLink: "https://www.kabum.com.br/produto/497579/processador-intel-core-i5-14600kf-14-geracao-5-3-ghz-max-turbo-cache-24mb-14-nucleos-20-threads-lga1700-bx8071514600kf",
    cpu: {
      create: {
        socket: "LGA1700",
        cores: 14,
        threads: 20,
        frequency: 5.3,
        tdp: 125,
        integratedGraphics: false,
      },
    },
  },
  {
    name: "RX 7600 Challenger ASRock",
    brand: "AMD",
    price: 1849.99,
    type: "GPU",
    priceLink: "https://www.kabum.com.br/produto/459144",
    gpu: {
      create: {
        memoryGB: 8,
        memoryType: "GDDR6",
        tdp: 165,
        lengthMM: 269,
      },
    },
  },
  {
    name: "RTX 5060 PRIME ASUS",
    brand: "NVIDIA",
    price: 2749.90,
    type: "GPU",
    priceLink: "https://www.kabum.com.br/produto/781226",
    gpu: {
      create: {
        memoryGB: 8,
        memoryType: "GDDR7",
        tdp: 140,
        lengthMM: 280,
      },
    },
  },
  {
    name: "RTX 5070 Windforce OC Gigabyte",
    brand: "NVIDIA",
    price: 3849.90,
    type: "GPU",
    priceLink: "https://www.kabum.com.br/produto/714574",
    gpu: {
      create: {
        memoryGB: 12,
        memoryType: "GDDR7",
        tdp: 200,
        lengthMM: 261,
      },
    },
  },
  {
    name: "RX 9060 XT Challenger ASRock",
    brand: "AMD",
    price: 3349.99,
    type: "GPU",
    priceLink: "https://www.kabum.com.br/produto/779095",
    gpu: {
      create: {
        memoryGB: 16,
        memoryType: "GDDR6",
        tdp: 225,
        lengthMM: 275,
      },
    },
  },
  {
    name: "Arc B570 Challenger OC ASRock",
    brand: "Intel",
    price: 2299.90,
    type: "GPU",
    priceLink: "https://www.kabum.com.br/produto/775944",
    gpu: {
      create: {
        memoryGB: 10,
        memoryType: "GDDR6",
        tdp: 180,
        lengthMM: 267,
      },
    },
  },
  {
    name: "Gigabyte B550M AORUS Elite",
    brand: "Gigabyte",
    price: 849.90,
    type: "MOTHERBOARD",
    priceLink: "https://www.amazon.com.br/PLACA-GIGABYTE-B550M-AORUS-ELITE/dp/B08BN8VD23",
    motherboard: {
      create: {
        socket: "AM4",
        ramType: "DDR4",
        slots: 4,
        maxRAM: 128,
        size: "Micro-ATX",
      },
    },
  },
  {
    name: "ASUS Prime A520M-K",
    brand: "ASUS",
    price: 479.90,
    type: "MOTHERBOARD",
    priceLink: "https://www.amazon.com.br/ASUS-90MB1500-M0EAY0-Prime-A520M-K/dp/B08DQB2GDN",
    motherboard: {
      create: {
        socket: "AM4",
        ramType: "DDR4",
        slots: 2,
        maxRAM: 64,
        size: "Micro-ATX",
      },
    },
  },
  {
    name: "ASUS Prime H610M-K D4",
    brand: "ASUS",
    price: 599.90,
    type: "MOTHERBOARD",
    priceLink: "https://www.amazon.com.br/Placa-PRIME-H610M-K-D4-micro/dp/B09P3RV6ZC",
    motherboard: {
      create: {
        socket: "LGA1700",
        ramType: "DDR4",
        slots: 2,
        maxRAM: 64,
        size: "Micro-ATX",
      },
    },
  },
  {
    name: "ASUS Prime A620M-E",
    brand: "ASUS",
    price: 729.90,
    type: "MOTHERBOARD",
    priceLink: "https://www.kabum.com.br/produto/521066",
    motherboard: {
      create: {
        socket: "AM5",
        ramType: "DDR5",
        slots: 2,
        maxRAM: 96,
        size: "Micro-ATX",
      },
    },
  },
  {
    name: "ASUS TUF Gaming B760M-PLUS",
    brand: "ASUS",
    price: 1249.90,
    type: "MOTHERBOARD",
    priceLink: "https://www.amazon.com.br/Placa-Asus-GAMING-B760M-PLUS-4xDDR5/dp/B086ZSQNPP",
    motherboard: {
      create: {
        socket: "LGA1700",
        ramType: "DDR5",
        slots: 4,
        maxRAM: 192,
        size: "Micro-ATX",
      },
    },
  },
  {
    name: "Gigabyte X870 Eagle WIFI7",
    brand: "Gigabyte",
    price: 2299.90,
    type: "MOTHERBOARD",
    priceLink: "https://www.amazon.com.br/GIGABYTE-X870-WIFI7-EZ-Latch-Q-Flash/dp/B0DGVMYTW6",
    motherboard: {
      create: {
        socket: "AM5",
        ramType: "DDR5",
        slots: 4,
        maxRAM: 192,
        size: "ATX",
      },
    },
  },
  {
    name: "MSI H510M-B",
    brand: "MSI",
    price: 490.00,
    type: "MOTHERBOARD",
    priceLink: "https://www.amazon.com.br/PLACA-MSI-H510M-B-DDR4-GERACAO/dp/B09Y1BCPNC",
    motherboard: {
      create: {
        socket: "LGA1200",
        ramType: "DDR4",
        slots: 2,
        maxRAM: 64,
        size: "Micro-ATX",
      },
    },
  },
];

(async () => {
  for (const part of parts) {
    await seedPart(part);
  }
})();
