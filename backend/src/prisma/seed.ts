async function seedPart(data: any) {
  const response = await fetch("http://localhost:3000/parts/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  console.log(`Peça criada com sucesso: ${data.name} ✅ `);
}

const parts = [
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
    "name": "Gamdias Boreas E1-410 Red 120mm",
    "brand": "Gamdias",
    "type": "COOLER",
    "priceLink": "https://www.terabyteshop.com.br/produto/25350/cooler-processador-gamdias-boreas-e1-410-red-120mm-intel-amd-boreas-e1-410-red",
    "cooler": {
      "create": {
        "type": "Air",
        "socketSupport": "Intel & AMD",
        "noiseLevel": 31,
        "maxTdp": 130
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
        "type": "Air",
        "socketSupport": "Intel LGA 1200/115x, AMD AM4",
        "noiseLevel": 25,
        "maxTdp": 225
      }
    }
  },
  {
    "name": "Gamer Black RGB 240mm",
    "brand": "Rise Mode",
    "type": "COOLER",
    "priceLink": "https://www.kabum.com.br/produto/130043/water-cooler-rise-mode-gamer-black-rgb-240mm-amd-intel-preto-rm-wcb-02-rgb",
    "cooler": {
      "create": {
        "type": "Liquid",
        "socketSupport": "Intel LGA 115X/1200/1700, AMD AM4/AM5",
        "noiseLevel": 32,
        "maxTdp": 250
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
    "priceLink": "https://www.kabum.com.br/produto/629987/processador-amd-ryzen-3-5300g-4ghz-4-2ghz-max-turbo-cache-8mb-am4-4-nucleos-8-threads-video-integrado-100-100000253box?gad_campaignid=22429436063",
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
        "lengthMM": 170,
        "gpuClock": 2000,
        "memoryBus": 96
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
        "lengthMM": 170,
        "gpuClock": 2800,
        "memoryBus": 64
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
        "gpuClock": 1470,
        "memoryBus": 96
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
        "gpuClock": 2460,
        "memoryBus": 128
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
        "gpuClock": 2970,
        "memoryBus": 256
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
    priceLink: "https://www.kabum.com.br/produto/621162/ssd-kingston-nv3-1-tb-m-2-2280-pcie-4-0-x4-nvme-leitura-6000-mb-s-gravacao-4000-mb-s-azul-snv3s-1000g",
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
        type: "Air",
        socketSupport: "Intel LGA 1200/115x, AMD AM4",
        "noiseLevel": 45,
        "maxTdp": 150
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
        "gpuClock": 2755,
        "memoryBus": 128
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
        "gpuClock": 2500,
        "memoryBus": 128
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
        "gpuClock": 2512,
        "memoryBus": 192
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
        "gpuClock": 2530,
        "memoryBus": 129
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
        "gpuClock": 2500,
        "memoryBus": 160
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
  {
    name: "Galax GeForce RTX 5060 1-Click OC 8GB",
    brand: "NVIDIA",
    price: 2399.00,
    type: "GPU",
    priceLink: "https://www.kabum.com.br/produto/873649/placa-de-video-galax-geforce-rtx-5060-1-click-oc-nvidia-geforce-8gb-128bits-gddr7-g-sync-dlss-4-launch-edition-56nsn8mdcple?gad_campaignid=22429436072",
    gpu: {
      create: {
        memoryGB: 8,
        memoryType: "GDDR7",
        tdp: 130,
        lengthMM: 250,
        gpuClock: 2500,
        memoryBus: 128
      }
    }
  },
  {
    name: "Gigabyte GeForce RTX 5070 WINDFORCE OC SFF 12G",
    brand: "NVIDIA",
    price: 3899.00,
    type: "GPU",
    priceLink: "https://www.terabyteshop.com.br/produto/34884/placa-de-video-gigabyte-nvidia-geforce-rtx-5070-gaming-oc-12gb-gddr7-dlss-ray-tracing-gv-n5070gaming-oc-12gd?gad_campaignid=16138806718",
    gpu: {
      create: {
        memoryGB: 12,
        memoryType: "GDDR7",
        tdp: 220,
        lengthMM: 280,
        gpuClock: 2610,
        memoryBus: 192
      }
    }
  },
  {
    name: "Galax GeForce RTX 5060 Ti EX",
    brand: "NVIDIA",
    price: 2899.00,
    type: "GPU",
    priceLink: "https://patoloco.com.br/placa-de-video-galax-geforce-rtx-5060-ti-ex-8gb-gddr7-128-bit-56isn8mdcrex",
    gpu: {
      create: {
        memoryGB: 8,
        memoryType: "GDDR7",
        tdp: 160,
        lengthMM: 270,
        gpuClock: 2650,
        memoryBus: 128
      }
    }
  },
  {
    name: "ASRock Radeon RX 6600 Challenger D 8GB",
    brand: "AMD",
    price: 1349.00,
    type: "GPU",
    priceLink: "https://www.kabum.com.br/produto/235984/placa-de-video-rx-6600-cld-8g-asrock-amd-radeon-8gb-gddr6-90-ga2rzz-00uanf",
    gpu: {
      create: {
        memoryGB: 8,
        memoryType: "GDDR6",
        tdp: 132,
        lengthMM: 240,
        gpuClock: 2044,
        memoryBus: 128
      }
    }
  },
  {
    name: "Galax GeForce RTX 5070 Ti EX Gamer 1-Click OC 16GB",
    brand: "NVIDIA",
    price: 4999.00,
    type: "GPU",
    priceLink: "https://patoloco.com.br/placa-de-video-galax-geforce-5070-ti-ex-gamer-1-click-oc-16gb-gddr7-256-bit-57izn6mdbuex",
    gpu: {
      create: {
        memoryGB: 16,
        memoryType: "GDDR7",
        tdp: 285,
        lengthMM: 300,
        gpuClock: 2700,
        memoryBus: 256
      }
    }
  },
  {
    name: "Gigabyte GeForce RTX 5090 GAMING OC 32GB",
    brand: "NVIDIA",
    price: 9999.00,
    type: "GPU",
    priceLink: "https://www.terabyteshop.com.br/produto/34546/placa-de-video-gigabyte-nvidia-geforce-rtx-5090-gaming-oc-32gb-gddr7-dlss-ray-tracing-gv-n5090gaming-oc-32gd?p=159401",
    gpu: {
      create: {
        memoryGB: 32,
        memoryType: "GDDR7",
        tdp: 420,
        lengthMM: 340,
        gpuClock: 2800,
        memoryBus: 384
      }
    }
  },
  {
    name: "XFX Swift AMD Radeon RX 9060 XT OC White Gaming Edition 8GB",
    brand: "AMD",
    price: 2699.00,
    type: "GPU",
    priceLink: "https://www.terabyteshop.com.br/produto/36492/placa-de-video-xfx-swift-amd-radeon-rx-9060-xt-oc-white-8gb-gddr6-fsr-ray-tracing-rx-96tsw8gwq?p=159401",
    gpu: {
      create: {
        memoryGB: 8,
        memoryType: "GDDR6",
        tdp: 180,
        lengthMM: 280,
        gpuClock: 2600,
        memoryBus: 128
      }
    }
  },
  {
    name: "ASUS Dual GeForce RTX 3050 OC Edition 6GB GDDR6",
    brand: "NVIDIA",
    price: 1229.00,
    type: "GPU",
    priceLink: "https://www.amazon.com.br/Placa-V%C3%ADdeo-Asus-NVIDIA-Geforce/dp/B086ZSH289/ref=asc_df_B086ZSH289?mcid=96463b3aecb83b98a4ff166f09733de5&hvadid=709884378214&hvpos=&hvnetw=g&hvrand=10013857844170527268&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9198625&hvtargid=pla-2367632184679&psc=1&language=pt_BR",
    gpu: {
      create: {
        memoryGB: 6,
        memoryType: "GDDR6",
        tdp: 115,
        lengthMM: 220,
        gpuClock: 1807,
        memoryBus: 96
      }
    }
  },
  {
    name: "XFX Speedster SWFT 210 AMD Radeon RX 6650 XT Core",
    brand: "AMD",
    price: 1549.00,
    type: "GPU",
    priceLink: "https://www.kabum.com.br/produto/576421/placa-de-video-rx-6650xt-xfx-speedster-swft210-amd-radeon-8gb-gddr6-hdmi-3xdp-2-fan-rx-665x8dfdy",
    gpu: {
      create: {
        memoryGB: 8,
        memoryType: "GDDR6",
        tdp: 176,
        lengthMM: 270,
        gpuClock: 2635,
        memoryBus: 128
      }
    }
  },
  {
    name: "Intel Core i5-14600K",
    brand: "Intel",
    price: 1599.00,
    type: "CPU",
    priceLink: "https://www.kabum.com.br/produto/497578/processador-intel-core-i5-14600k-14-geracao-5-3-ghz-max-turbo-cache-24mb-14-nucleos-20-threads-lga1700-bx8071514600k?gad_campaignid=22429436063",
    cpu: {
      create: {
        socket: "LGA1700",
        cores: 14,
        threads: 20,
        frequency: 3.5,
        tdp: 125,
        integratedGraphics: true
      }
    }
  },
  {
    name: "AMD Ryzen 9 9900X3D",
    brand: "AMD",
    price: 3199.00,
    type: "CPU",
    priceLink: "https://www.gigantec.com.br/processador-amd-ryzen-9-9900x3d-am5-443ghz-5-5ghz-turbo-12-cores-24-threads-140mb-s-cooler-c-video.html",
    cpu: {
      create: {
        socket: "AM5",
        cores: 12,
        threads: 24,
        frequency: 4.4,
        tdp: 120,
        integratedGraphics: true
      }
    }
  },
  {
    name: "AMD Ryzen 9 7950X",
    brand: "AMD",
    price: 2999.00,
    type: "CPU",
    priceLink: "https://www.kabum.com.br/produto/378411/processador-amd-ryzen-9-7950x-5-7ghz-max-turbo-cache-80mb-am5-16-nucleos-video-integrado-100-100000514wof",
    cpu: {
      create: {
        socket: "AM5",
        cores: 16,
        threads: 32,
        frequency: 4.5,
        tdp: 170,
        integratedGraphics: true
      }
    }
  },
  {
    name: "AMD Ryzen 7 9800X3D",
    brand: "AMD",
    price: 2499.00,
    type: "CPU",
    priceLink: "https://www.kabum.com.br/produto/677529/processador-amd-ryzen-7-9800x3d-4-7ghz-5-2ghz-turbo-8-cores-16-threads-am5-sem-cooler-100-1000001084wof",
    cpu: {
      create: {
        socket: "AM5",
        cores: 8,
        threads: 16,
        frequency: 4.7,
        tdp: 120,
        integratedGraphics: true
      }
    }
  },
  {
    name: "Intel Core Ultra 5 245K",
    brand: "Intel",
    price: 1299.00,
    type: "CPU",
    priceLink: "https://www.terabyteshop.com.br/produto/32054/processador-intel-core-ultra-5-245kf-36-ghz-52ghz-turbo-serie-2-14-cores-14-threads-lga-1851-bx80768245kf?gad_campaignid=16775129218",
    cpu: {
      create: {
        socket: "LGA1851",
        cores: 14,
        threads: 14,
        frequency: 4.2,
        tdp: 125,
        integratedGraphics: true
      }
    }
  },
  {
    name: "Intel Core i9-14900KF",
    brand: "Intel",
    price: 3899.00,
    type: "CPU",
    priceLink: "https://www.amazon.com.br/PROCESSADOR-I9-14900KF-LGA1700-14%C2%B0GERACAO-BX8071514900KF/dp/B0CHBJXG7G/ref=asc_df_B0CHBJXG7G?mcid=40908513e06f36c89ab39ac3356d81ec&hvadid=709884378235&hvpos=&hvnetw=g&hvrand=18144471889315169642&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9198625&hvtargid=pla-2227386968620&psc=1&language=pt_BR",
    cpu: {
      create: {
        socket: "LGA1700",
        cores: 24,
        threads: 32,
        frequency: 3.0,
        tdp: 125,
        integratedGraphics: false
      }
    }
  },
  {
    name: "AMD Ryzen 7 7700",
    brand: "AMD",
    price: 1499.00,
    type: "CPU",
    priceLink: "https://www.amazon.com.br/dp/B0BMQHSCVF",
    cpu: {
      create: {
        socket: "AM5",
        cores: 8,
        threads: 16,
        frequency: 3.8,
        tdp: 65,
        integratedGraphics: true
      }
    }
  },
  {
    name: "Intel Core i5-14400F",
    brand: "Intel",
    price: 899.00,
    type: "CPU",
    priceLink: "https://www.gigantec.com.br/processador-intel-core-i5-14400f-14-geracao-lga1700-bx8071514400f.html",
    cpu: {
      create: {
        socket: "LGA1700",
        cores: 14,
        threads: 20,
        frequency: 2.5,
        tdp: 65,
        integratedGraphics: false
      }
    }
  },
  {
    name: "Intel Core i5-13400F",
    brand: "Intel",
    price: 799.00,
    type: "CPU",
    priceLink: "https://www.gigantec.com.br/processador-intel-core-i5-13400f-lga-1700-2-5ghz-4-6ghz-turbo-sem-video-bx8071513400f.html",
    cpu: {
      create: {
        socket: "LGA1700",
        cores: 10,
        threads: 16,
        frequency: 2.5,
        tdp: 65,
        integratedGraphics: false
      }
    }
  },
  {
    name: "Intel Core i5-12600KF",
    brand: "Intel",
    price: 1299.00,
    type: "CPU",
    priceLink: "https://www.terabyteshop.com.br/produto/19624/processador-intel-core-i5-12600kf-37ghz-49ghz-turbo-12-geracao-10-cores-16-threads-lga-1700-bx8071512600kf",
    cpu: {
      create: {
        socket: "LGA1700",
        cores: 10,
        threads: 16,
        frequency: 3.7,
        tdp: 125,
        integratedGraphics: false
      }
    }
  },
  {
    name: "Intel Core i5-12600K",
    brand: "Intel",
    price: 1199.00,
    type: "CPU",
    priceLink: "https://www.terabyteshop.com.br/produto/19622/processador-intel-core-i5-12600k-37ghz-49ghz-turbo-12-geracao-10-cores-16-threads-lga-1700-bx8071512600k",
    cpu: {
      create: {
        socket: "LGA1700",
        cores: 10,
        threads: 16,
        frequency: 3.7,
        tdp: 125,
        integratedGraphics: true
      }
    }
  },
  {
    name: "Intel Core i5-13600K",
    brand: "Intel",
    price: 1499.00,
    type: "CPU",
    priceLink: "https://www.gigantec.com.br/processador-intel-core-i5-13600k-lga-1700-2-6-ghz-5-1ghz-max-turbo-24mb-cache-bx8071513600k.html",
    cpu: {
      create: {
        socket: "LGA1700",
        cores: 14,
        threads: 20,
        frequency: 2.6,
        tdp: 125,
        integratedGraphics: true
      }
    }
  },
  {
    name: "Intel Core i9-12900KS",
    brand: "Intel",
    price: 2499.00,
    type: "CPU",
    priceLink: "https://www.kabum.com.br/produto/315286/processador-intel-core-i9-12900ks-3-4ghz-5-5ghz-max-turbo-cache-30mb-lga-1700-video-integrado-bx8071512900ks?gad_campaignid=22429436063",
    cpu: {
      create: {
        socket: "LGA1700",
        cores: 16,
        threads: 24,
        frequency: 3.4,
        tdp: 150,
        integratedGraphics: true
      }
    }
  },
  {
    name: "AMD Ryzen 9 9900X",
    brand: "AMD",
    price: 2899.00,
    type: "CPU",
    priceLink: "https://www.microgem.com.br/produto/processador-amd-ryzen-9-9900x-am5-4-4-ghz-base-5-6-ghz-max-76-mb-cache-12-core-24-threads-100-100000662wof-77102",
    cpu: {
      create: {
        socket: "AM5",
        cores: 12,
        threads: 24,
        frequency: 4.4,
        tdp: 120,
        integratedGraphics: true
      }
    }
  },
  {
    name: "AMD Ryzen 7 8700G",
    brand: "AMD",
    price: 2199.00,
    type: "CPU",
    priceLink: "https://www.kabum.com.br/produto/520364/processador-amd-ryzen-7-8700g-4-2ghz-5-1ghz-max-turbo-cache-8mb-octa-core-16-threads-am5-video-integrado-100-100001236box?gad_campaignid=22429436063",
    cpu: {
      create: {
        socket: "AM5",
        cores: 8,
        threads: 16,
        frequency: 4.2,
        tdp: 65,
        integratedGraphics: true
      }
    }
  },
  {
    name: "AMD Ryzen 7 5800X",
    brand: "AMD",
    price: 1599.00,
    type: "CPU",
    priceLink: "https://www.ciapc.com.br/hardware/processadores/socket-am4/processador-amd-ryzen-7-5800x-octa-core-3-8ghz-4-7ghz-turbo-36mb-cache-am4-100-100000063wof",
    cpu: {
      create: {
        socket: "AM4",
        cores: 8,
        threads: 16,
        frequency: 3.8,
        tdp: 105,
        integratedGraphics: false
      }
    }
  },
  {
    name: "Intel Core i3-10100F",
    brand: "Intel",
    price: 399.00,
    type: "CPU",
    priceLink: "https://www.kabum.com.br/produto/129960/processador-intel-core-i3-10100f-3-6ghz-4-3ghz-max-boost-cache-6mb-quad-core-8-threads-lga-1200-bx8070110100f?gad_campaignid=22429436063",
    cpu: {
      create: {
        socket: "LGA1200",
        cores: 4,
        threads: 8,
        frequency: 3.6,
        tdp: 65,
        integratedGraphics: false
      }
    }
  },
  {
    name: "AMD Ryzen 5 8400F",
    brand: "AMD",
    price: 899.00,
    type: "CPU",
    priceLink: "https://www.amazon.com.br/AMD-Bandeja-8400F-6xCore-12xThread/dp/B0DDQ4KRPR/ref=asc_df_B0DDQ4KRPR?mcid=2b348637c6063619be6f99306b27c6b7&hvadid=709884378235&hvpos=&hvnetw=g&hvrand=13711174599907806530&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9198625&hvtargid=pla-2365201726683&psc=1&language=pt_BR",
    cpu: {
      create: {
        socket: "AM5",
        cores: 6,
        threads: 12,
        frequency: 4.2,
        tdp: 65,
        integratedGraphics: false
      }
    }
  },
  {
    name: "MSI A620M‑E",
    brand: "MSI",
    price: 899.00,
    type: "MOTHERBOARD",
    priceLink: "https://www.guerradigital.com.br/produtos/msi-a620m-e-chipset-a620-amd-am5-matx-ddr5-911-7e28-001/",
    motherboard: {
      create: {
        socket: "AM5",
        ramType: "DDR5",
        slots: 2,
        maxRAM: 96,
        size: "Micro-ATX"
      }
    }
  },
  {
    name: "MSI A520M‑A PRO",
    brand: "MSI",
    price: 459.00,
    type: "MOTHERBOARD",
    priceLink: "https://www.kabum.com.br/produto/280890/placa-mae-msi-a520m-a-pro-amd-am4-matx-ddr4-preto-a520m-a-pro",
    motherboard: {
      create: {
        socket: "AM4",
        ramType: "DDR4",
        slots: 2,
        maxRAM: 128,
        size: "Micro-ATX"
      }
    }
  },
  {
    name: "Gigabyte A520M‑K V2",
    brand: "Gigabyte",
    price: 499.00,
    type: "MOTHERBOARD",
    priceLink: "https://www.gigantec.com.br/placa-m-e-gigabyte-a520m-k-v2-am4-2xddr4-chipset-amd-a520-matx.html",
    motherboard: {
      create: {
        socket: "AM4",
        ramType: "DDR4",
        slots: 2,
        maxRAM: 128,
        size: "Micro-ATX"
      }
    }
  },
  {
    name: "ASRock H510M‑HVS R2.0",
    brand: "ASRock",
    price: 529.00,
    type: "MOTHERBOARD",
    priceLink: "https://www.amazon.com.br/ASRock-H510m-hvs-Socket-Lga1200-Chipset/dp/B09BDDLNHQ?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&psc=1&smid=A1ZZFT5FULY4LN",
    motherboard: {
      create: {
        socket: "LGA1200",
        ramType: "DDR4",
        slots: 2,
        maxRAM: 128,
        size: "Micro-ATX"
      }
    }
  },
  {
    name: "Gigabyte H610M‑K DDR4",
    brand: "Gigabyte",
    price: 479.00,
    type: "MOTHERBOARD",
    priceLink: "https://www.gigantec.com.br/placa-m-e-gigabyte-h610m-k-ddr4-intel-lga1700-chipset-h610-2xddr4-matx.html",
    motherboard: {
      create: {
        socket: "LGA1700",
        ramType: "DDR4",
        slots: 2,
        maxRAM: 64,
        size: "Micro-ATX"
      }
    }
  },
  {
    name: "ASRock H510M‑HDV",
    brand: "ASRock",
    price: 509.00,
    type: "MOTHERBOARD",
    priceLink: "https://www.gigantec.com.br/placa-m-e-asrock-h510m-hdv-m-2-lga-1200-h510-matx-ddr4.html",
    motherboard: {
      create: {
        socket: "LGA1200",
        ramType: "DDR4",
        slots: 2,
        maxRAM: 128,
        size: "Micro-ATX"
      }
    }
  },
  {
    name: "ASRock H610M‑HVS M.2",
    brand: "ASRock",
    price: 459.00,
    type: "MOTHERBOARD",
    priceLink: "https://www.kabum.com.br/produto/644996/placa-mae-asrock-h610m-hvs-m-2-intel-m-atx-ddr4-socket-lga-1700-hdmi-d-sub-preto-90-mxbjj0-a0bay1z",
    motherboard: {
      create: {
        socket: "LGA1700",
        ramType: "DDR4",
        slots: 2,
        maxRAM: 64,
        size: "Micro-ATX"
      }
    }
  },
  {
    name: "ASRock B450M‑Steel Legend",
    brand: "ASRock",
    price: 699.00,
    type: "MOTHERBOARD",
    priceLink: "https://www.kabum.com.br/produto/100672/placa-mae-asrock-b450m-steel-legend-amd-am4-matx-ddr4-preto-b450m-steel-legend",
    motherboard: {
      create: {
        socket: "AM4",
        ramType: "DDR4",
        slots: 2,
        maxRAM: 128,
        size: "Micro-ATX"
      }
    }
  },
  {
    name: "ASUS TUF Gaming A520M‑Plus WiFi",
    brand: "ASUS",
    price: 799.00,
    type: "MOTHERBOARD",
    priceLink: "https://www.kabum.com.br/produto/165124/placa-mae-asus-tuf-gaming-a520m-plus-wifi-amd-am4-rgb-matx-ddr4-preto-90mb17f0-m0eay0",
    motherboard: {
      create: {
        socket: "AM4",
        ramType: "DDR4",
        slots: 2,
        maxRAM: 128,
        size: "Micro-ATX"
      }
    }
  },
  {
    name: "Gigabyte B760M‑D2H DDR4",
    brand: "Gigabyte",
    price: 719.00,
    type: "MOTHERBOARD",
    priceLink: "https://www.terabyteshop.com.br/produto/27475/placa-mae-gigabyte-b760m-d2h-ddr4-chipset-b760-intel-lga-1700-m-atx-ddr4?p=159401",
    motherboard: {
      create: {
        socket: "LGA1700",
        ramType: "DDR4",
        slots: 4,
        maxRAM: 128,
        size: "Micro-ATX"
      }
    }
  },
  {
    name: "ASUS TUF Gaming B760M‑Plus",
    brand: "ASUS",
    price: 899.00,
    type: "MOTHERBOARD",
    priceLink: "https://www.kabum.com.br/produto/404822/placa-mae-asus-tuf-gaming-b760m-plus-intel-lga-1700-matx-d4-ddr4-preto-90mb1di0-m0eay0",
    motherboard: {
      create: {
        socket: "LGA1700",
        ramType: "DDR4",
        slots: 4,
        maxRAM: 128,
        size: "Micro-ATX"
      }
    }
  },
  {
    name: "ASUS Prime Z790M‑Plus Wifi",
    brand: "ASUS",
    price: 999.00,
    type: "MOTHERBOARD",
    priceLink: "https://www.kabum.com.br/produto/392035/placa-mae-asus-prime-z790-a-wi-fi-intel-lga1700-z790-atx-ddr5-preto-90mb1cs0-m0eay0?gad_campaignid=22429436060",
    motherboard: {
      create: {
        socket: "LGA1700",
        ramType: "DDR5",
        slots: 4,
        maxRAM: 128,
        size: "Micro-ATX"
      }
    }
  },
  {
    name: "ASUS Prime H510M‑K",
    brand: "ASUS",
    price: 529.00,
    type: "MOTHERBOARD",
    priceLink: "https://www.amazon.com.br/PLACA-ASUS-H510M-K-LGA1200-GERACAO/dp/B0BT93GRCT/ref=asc_df_B0BT93GRCT?mcid=baf9c76ed76d3345b15206c849708723&hvadid=709884378163&hvpos=&hvnetw=g&hvrand=8255708416834620903&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9198625&hvtargid=pla-2088779765734&psc=1&language=pt_BR",
    motherboard: {
      create: {
        socket: "LGA1200",
        ramType: "DDR4",
        slots: 2,
        maxRAM: 128,
        size: "Micro-ATX"
      }
    }
  },
  {
    name: "Gigabyte B860M‑Gaming WiFi6",
    brand: "Gigabyte",
    price: 1199.00,
    type: "MOTHERBOARD",
    priceLink: "https://www.terabyteshop.com.br/produto/35964/placa-mae-gigabyte-b860m-gaming-wifi6-chipset-b860-intel-lga-1851-matx-ddr5?p=159401",
    motherboard: {
      create: {
        socket: "LGA1851",
        ramType: "DDR5",
        slots: 4,
        maxRAM: 128,
        size: "Micro-ATX"
      }
    }
  },
  {
    name: "MSI Z890 Gaming Plus WiFi 7",
    brand: "MSI",
    price: 1399.00,
    type: "MOTHERBOARD",
    priceLink: "https://www.gigantec.com.br/placa-m-e-msi-z890-gaming-plus-wifi-7-lga-1851-4xddr5.html",
    motherboard: {
      create: {
        socket: "LGA1851",
        ramType: "DDR5",
        slots: 4,
        maxRAM: 128,
        size: "Micro-ATX"
      }
    }
  },
  {
    name: "B850 Gaming Plus Wifi",
    brand: "MSI",
    price: 1499.00,
    type: "MOTHERBOARD",
    priceLink: "https://www.amazon.com.br/MSI-Placa-m%C3%A3e-B850-Gaming-Plus/dp/B0DQBT2DZ8/ref=asc_df_B0DQBT2DZ8?mcid=a5a165f9330132188619277b47d8b25a&hvadid=709884378163&hvpos=&hvnetw=g&hvrand=15971628085359756820&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9198625&hvtargid=pla-2398333717825&psc=1&language=pt_BR",
    motherboard: {
      create: {
        socket: "AM5",
        ramType: "DDR5",
        slots: 4,
        maxRAM: 256,
        size: "ATX"
      }
    }
  },
  {
    name: "Rise Mode Zeus 850W",
    brand: "Rise Mode",
    price: 419.99,
    type: "PSU",
    priceLink: "https://www.kabum.com.br/produto/461384/fonte-gamer-rise-mode-zeus-850w-modular-pfc-ativo-preto-rm-psu-01-pa-850",
    psu: {
      create: {
        powerW: 850,
        certification: "80 Plus",
        modular: true
      }
    }
  },
  {
    name: "XPG Core Reactor 750W",
    brand: "XPG",
    price: 679.90,
    type: "PSU",
    priceLink: "https://www.gigantec.com.br/fonte-de-alimentac-o-adata-xpg-core-reactor-750w-80-plus-gold-pcf-ativo-full-modular-c-cabo.html",
    psu: {
      create: {
        powerW: 750,
        certification: "80 Plus Gold",
        modular: true
      }
    }
  },
  {
    name: "XPG Core Reactor 850W",
    brand: "XPG",
    price: 799.99,
    type: "PSU",
    priceLink: "https://www.kabum.com.br/produto/103282/fonte-xpg-core-reactor-850w-80-plus-gold-modular-com-cabo-preto-core-reactor",
    psu: {
      create: {
        powerW: 850,
        certification: "80 Plus Gold",
        modular: true
      }
    }
  },
  {
    name: "Galax Teclab TL 1050W Platinum",
    brand: "Galax",
    price: 1099.90,
    type: "PSU",
    priceLink: "https://www.kabum.com.br/produto/534547/fonte-galax-teclab-edition-tl-1050w-platinum-atx-3-1-tl1050prbks8810br",
    psu: {
      create: {
        powerW: 1050,
        certification: "80 Plus Platinum",
        modular: true
      }
    }
  },
  {
    name: "Duex Pulse Pro 500W",
    brand: "Duex",
    price: 269.90,
    type: "PSU",
    priceLink: "https://www.amazon.com.br/dp/B0DQQFT3ZC?psc=1",
    psu: {
      create: {
        powerW: 500,
        certification: "80 Plus Bronze",
        modular: false
      }
    }
  },
  {
    name: "Corsair HX1500i 1500W Platinum",
    brand: "Corsair",
    price: 1749.90,
    type: "PSU",
    priceLink: "https://www.kabum.com.br/produto/371160/fonte-corsair-hxi-series-2022-hx1500i-1500w-80-plus-platinum-modular-com-cabos-preto-cp-9020215-ww",
    psu: {
      create: {
        powerW: 1500,
        certification: "80 Plus Platinum",
        modular: true
      }
    }
  },
  {
    name: "Husky Sledger 650W",
    brand: "Husky",
    price: 319.99,
    type: "PSU",
    priceLink: "https://www.kabum.com.br/produto/603223/fonte-husky-sledger-650w-80-plus-bronze-cybenetics-bronze-pfc-ativo-bivolt-hfn650pt",
    psu: {
      create: {
        powerW: 650,
        certification: "80 Plus Bronze",
        modular: false
      }
    }
  },
  {
    name: "Adata Legend 860 2TB",
    brand: "Adata",
    price: 739.99,
    type: "SSD",
    priceLink: "https://www.kabum.com.br/produto/703113/ssd-adata-legend-860-2tb-m-2-2280-pcie-gen-4x4-nvme-leitura-6000mb-s-gravacao-5000mb-s-compativel-com-ps5-preto-sleg-860-2000gcs",
    ssd: {
      create: {
        capacityGB: 2000,
        type: "NVMe",
        readMBs: 6000,
        writeMBs: 5000
      }
    }
  },
  {
    name: "Patriot 120GB SATA",
    brand: "Patriot",
    price: 99.90,
    type: "SSD",
    priceLink: "https://www.enifler.com.br/ssd-120gb-25-sata-iii-patriot",
    ssd: {
      create: {
        capacityGB: 120,
        type: "SATA",
        readMBs: 500,
        writeMBs: 400
      }
    }
  },
  {
    name: "TeamGroup GX2 128GB",
    brand: "Team Group",
    price: 109.99,
    type: "SSD",
    priceLink: "https://www.amazon.com.br/Team-Group-128GB-SATA-T253X2128G0C101/dp/B07SB1MB9X",
    ssd: {
      create: {
        capacityGB: 128,
        type: "SATA",
        readMBs: 500,
        writeMBs: 320
      }
    }
  },
  {
    name: "Crucial BX500 240GB",
    brand: "Crucial",
    price: 149.90,
    type: "SSD",
    priceLink: "https://www.gkinfostore.com.br/ssd-240gb-bx500-crucial-2.5-sata-iii-blister-ct240bx500ssd1",
    ssd: {
      create: {
        capacityGB: 240,
        type: "SATA",
        readMBs: 540,
        writeMBs: 500
      }
    }
  },
  {
    name: "TeamGroup MP33 256GB NVMe",
    brand: "Team Group",
    price: 169.90,
    type: "SSD",
    priceLink: "https://www.amazon.com.br/SSD-ALLTEK-256GB-SATA-III/dp/B0D4YMTFG1/ref=asc_df_B0D4YMTFG1?mcid=f04dc6e688033c9789cb4df74e5b6496&hvadid=709884378232&hvpos=&hvnetw=g&hvrand=10784194849192403105&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9198625&hvtargid=pla-2393824720263&psc=1&language=pt_BR",
    ssd: {
      create: {
        capacityGB: 256,
        type: "NVMe",
        readMBs: 1600,
        writeMBs: 1000
      }
    }
  },
  {
    name: "Crucial BX500 500GB",
    brand: "Crucial",
    price: 239.90,
    type: "SSD",
    priceLink: "https://www.ciapc.com.br/ssd-crucial-bx500-500gb-sata-iii-6gbs-leitura-550mbs-gravacao-500mbs-ct500bx500ssd1",
    ssd: {
      create: {
        capacityGB: 500,
        type: "SATA",
        readMBs: 550,
        writeMBs: 500
      }
    }
  },
  {
    name: "SanDisk NVMe 500GB",
    brand: "SanDisk",
    price: 259.90,
    type: "SSD",
    priceLink: "https://www.ciapc.com.br/hardware/armazenamento/nvme/nvme-500gb-sandisk-plus-m-2-2280-pcie-gen-3x4-leitura-2400mbs-gravacao-2400mbs-sdssda3n-500g-g26",
    ssd: {
      create: {
        capacityGB: 500,
        type: "NVMe",
        readMBs: 2400,
        writeMBs: 2400
      }
    }
  },
  {
    name: "Adata Legend 710 512GB",
    brand: "Adata",
    price: 199.99,
    type: "SSD",
    priceLink: "https://www.kabum.com.br/produto/415885/ssd-adata-legend-710-512gb-m-2-2280-pcie-gen3x4-nvme-1-4-leitura-2-400-mb-s-e-gravacao-1-800-mb-s-azul-aleg-710-512gcs",
    ssd: {
      create: {
        capacityGB: 512,
        type: "NVMe",
        readMBs: 2400,
        writeMBs: 1800
      }
    }
  },
  {
    name: "Adata SU650 960GB",
    brand: "Adata",
    price: 379.90,
    type: "SSD",
    priceLink: "https://www.kabum.com.br/produto/110714/ssd-adata-su650-960gb-sata-iii-2-5-leitura-520mb-s-gravacao-450mb-s-preto-asu650ss-960gt-r",
    ssd: {
      create: {
        capacityGB: 960,
        type: "SATA",
        readMBs: 520,
        writeMBs: 450
      }
    }
  },
  {
    name: "Geil Evo Potenza 8GB DDR4 3200MHz",
    brand: "Geil",
    price: 129.90,
    type: "RAM",
    priceLink: "https://www.terabyteshop.com.br/produto/16841/memoria-ddr4-geil-evo-potenza-8gb-3200mhz-black-gapb48gb3200c16bsc?p=159401",
    ram: {
      create: {
        capacityGB: 8,
        type: "DDR4",
        frequency: 3200
      }
    }
  },
  {
    name: "Geil Evo Potenza 16GB (2x8GB) DDR4 3200MHz",
    brand: "Geil",
    price: 239.90,
    type: "RAM",
    priceLink: "https://www.terabyteshop.com.br/produto/20323/memoria-ddr4-geil-evo-potenza-amd-16gb-2x8gb-3200mhz-black-gapb416gb3200c16bdc?p=159401",
    ram: {
      create: {
        capacityGB: 16,
        type: "DDR4",
        frequency: 3200
      }
    }
  },
  {
    name: "ADATA XPG Gammix D10 16GB (2x8GB) DDR4 3600MHz",
    brand: "ADATA",
    price: 299.90,
    type: "RAM",
    priceLink: "https://www.terabyteshop.com.br/produto/23022/memoria-ddr4-xpg-gammix-d10-16gb-3600mhz-cl18-black-ax4u360016g18i-sb10",
    ram: {
      create: {
        capacityGB: 16,
        type: "DDR4",
        frequency: 3600
      }
    }
  },
  {
    name: "Patriot Viper Elite 5 RGB 32GB DDR5 6000MHz",
    brand: "Patriot",
    price: 599.90,
    type: "RAM",
    priceLink: "https://www.gkinfostore.com.br/memoria-patriot-viper-elite-5-rgb-32gb-1x32gb-ddr5-6000mhz-cl40-pver532g60c42w",
    ram: {
      create: {
        capacityGB: 32,
        type: "DDR5",
        frequency: 6000
      }
    }
  },
  {
    name: "Corsair Vengeance 32GB (2x16GB) DDR5 6400MHz",
    brand: "Corsair",
    price: 829.90,
    type: "RAM",
    priceLink: "https://www.gkinfostore.com.br/memoria-corsair-vengeance-32gb-2x16gb-ddr5-6400mhz-c36-cmk32gx5m2b6400c36",
    ram: {
      create: {
        capacityGB: 32,
        type: "DDR5",
        frequency: 6400
      }
    }
  },
  {
    name: "XPG Lancer RGB 16GB DDR5 7200MHz",
    brand: "XPG",
    price: 479.90,
    type: "RAM",
    priceLink: "https://www.ciapc.com.br/hardware/memoria-para-desktop/ddr5/memoria-16gb-ddr5-7200mhz-xpg-lancer-rgb-black-ax5u7200c3416g-clarbk",
    ram: {
      create: {
        capacityGB: 16,
        type: "DDR5",
        frequency: 7200
      }
    }
  },
  {
    name: "Kingston Fury Beast RGB 64GB (2x32GB) DDR5 6000MHz CL36",
    brand: "Kingston",
    price: 1299.90,
    type: "RAM",
    priceLink: "https://www.kabum.com.br/produto/448309/memoria-ram-kingston-fury-beast-rgb-64gb-2x32gb-6000mhz-ddr5-cl36-branco-kf560c36bweak2-64",
    ram: {
      create: {
        capacityGB: 64,
        type: "DDR5",
        frequency: 6000
      }
    }
  },
  {
    name: "Kingston Fury Beast 8GB DDR5 5600MHz",
    brand: "Kingston",
    price: 219.90,
    type: "RAM",
    priceLink: "https://www.ciapc.com.br/hardware/memoria/ddr5/memoria-8gb-ddr5-5600mhz-kingston-fury-beast-preto-kf556c40bb-8",
    ram: {
      create: {
        capacityGB: 8,
        type: "DDR5",
        frequency: 5600
      }
    }
  },
  {
    name: "Kingston Fury Beast EXPO RGB 64GB (2x32GB) DDR5 6000MHz CL30",
    brand: "Kingston",
    price: 1499.90,
    type: "RAM",
    priceLink: "https://www.kabum.com.br/produto/630660/memoria-ram-kingston-fury-beast-expo-rgb-64gb-2x32gb-6000mt-s-ddr5-dimm-cl30-preto-kf560c30bbeak2-64",
    ram: {
      create: {
        capacityGB: 64,
        type: "DDR5",
        frequency: 6000
      }
    }
  },
  {
    name: "Lexar Ares 16GB DDR4 3600MHz RGB",
    brand: "Lexar",
    price: 269.90,
    type: "RAM",
    priceLink: "https://www.gkinfostore.com.br/memoria-lexar-ares-ddr4-16gb-1x16gb-3600mhz-cl18-rgb-preto--ld4bu016g-r3600gsla",
    ram: {
      create: {
        capacityGB: 16,
        type: "DDR4",
        frequency: 3600
      }
    }
  },
  {
    name: "Gamdias Argus E4 Elite RGB Mid Tower",
    brand: "Gamdias",
    price: 399.90,
    type: "CASE",
    priceLink: "https://www.terabyteshop.com.br/produto/17947/gabinete-gamer-gamdias-argus-e4-elite-rgb-mid-tower-vidro-temperado-black-sem-fonte-com-1-fan?p=159401",
    case: {
      create: {
        supportedSizes: "ATX, Micro-ATX, Mini-ITX",
        maxGpuLengthMM: 340
      }
    }
  },
  {
    name: "Montech XR Mid Tower Black",
    brand: "Montech",
    price: 299.90,
    type: "CASE",
    priceLink: "https://www.terabyteshop.com.br/produto/29264/gabinete-gamer-montech-xr-mid-tower-black-atx-com-3-fans-vidro-temperado-xr-b?p=159401",
    case: {
      create: {
        supportedSizes: "ATX, Micro-ATX, Mini-ITX",
        maxGpuLengthMM: 360
      }
    }
  },
  {
    name: "Montech X3 Glass Mid Tower Black",
    brand: "Montech",
    price: 279.90,
    type: "CASE",
    priceLink: "https://www.terabyteshop.com.br/produto/18724/gabinete-gamer-montech-x3-glass-mid-tower-black-atx?p=159401",
    case: {
      create: {
        supportedSizes: "ATX, Micro-ATX, Mini-ITX",
        maxGpuLengthMM: 350
      }
    }
  },
  {
    name: "SuperFrame Cristal Mid Tower Branco",
    brand: "SuperFrame",
    price: 399.90,
    type: "CASE",
    priceLink: "https://www.terabyteshop.com.br/produto/30259/gabinete-gamer-superframe-cristal-mid-tower-vidro-temperado-atx-com-4-fans-argb-branco-sf-cs-ctmaw4f?p=159401",
    case: {
      create: {
        supportedSizes: "ATX, Micro-ATX, Mini-ITX",
        maxGpuLengthMM: 370
      }
    }
  },
  {
    name: "SuperFrame Black Noir Aquario Mid Tower",
    brand: "SuperFrame",
    price: 379.90,
    type: "CASE",
    priceLink: "https://www.terabyteshop.com.br/produto/30258/gabinete-gamer-superframe-black-noir-aquario-mid-tower-vidro-temperado-m-atx-preto-sem-fonte-com-3-fans-argb-sf-cs-bnmab3f?p=159401",
    case: {
      create: {
        supportedSizes: "Micro-ATX, Mini-ITX",
        maxGpuLengthMM: 330
      }
    }
  },
  {
    name: "XPG Starker Mid Tower Branco",
    brand: "XPG",
    price: 449.90,
    type: "CASE",
    priceLink: "https://www.gigantec.com.br/gabinete-gamer-xpg-starker-mid-tower-lateral-vidro-branco.html",
    case: {
      create: {
        supportedSizes: "ATX, Micro-ATX, Mini-ITX",
        maxGpuLengthMM: 360
      }
    }
  },
  {
    name: "Thermaltake View 270 TG ARGB Plus Matcha Green",
    brand: "Thermaltake",
    price: 489.90,
    type: "CASE",
    priceLink: "https://www.gkinfostore.com.br/gabinete-gamer-thermaltake-view-270-tg-argb-plus-matcha-green-lateral-de-vidro-temperado-ca-1y7-00mewn-00",
    case: {
      create: {
        supportedSizes: "ATX, Micro-ATX, Mini-ITX",
        maxGpuLengthMM: 370
      }
    }
  },
  {
    name: "NZXT H5 Elite Compact Mid Tower RGB",
    brand: "NZXT",
    price: 699.90,
    type: "CASE",
    priceLink: "https://www.kabum.com.br/produto/392078/gabinete-nzxt-h5-elite-compact-mid-tower-rgb-atx-lateral-e-frontal-em-vidro-temperado-3x-cooler-fan-preto-cc-h51eb-01",
    case: {
      create: {
        supportedSizes: "ATX, Micro-ATX, Mini-ITX",
        maxGpuLengthMM: 381
      }
    }
  },
  {
    name: "Gamdias Neso P1 BW Full Tower ATX",
    brand: "Gamdias",
    price: 1099.90,
    type: "CASE",
    priceLink: "https://www.kabum.com.br/produto/586438/gabinete-gamer-gamdias-neso-p1-bw-full-tower-atx-lateral-em-vidro-temperado-preto-e-branco-neso-p1-bw",
    case: {
      create: {
        supportedSizes: "E-ATX, ATX, Micro-ATX, Mini-ITX",
        maxGpuLengthMM: 400
      }
    }
  },
  {
    name: "Aerocool Trinity Mini V1 Branco",
    brand: "Aerocool",
    price: 259.90,
    type: "CASE",
    priceLink: "https://www.ciapc.com.br/perifericos/gabinetes/gabinete-gamer-aerocool-trinity-mini-v1-1-fan-s-fonte-branco-trinity-mini-g-wt-v1",
    case: {
      create: {
        supportedSizes: "Mini-ITX",
        maxGpuLengthMM: 270
      }
    }
  },
  {
    name: "PCYes Forcefield Black Vulcan Mid Tower",
    brand: "PCYes",
    price: 329.90,
    type: "CASE",
    priceLink: "https://www.amazon.com.br/PCYES-ForceField-TWR-Black-Vulcan/dp/B0DGMVGY15/ref=asc_df_B0DGMVGY15?mcid=2c9433bc32af3977bfa81543ee90405c&hvadid=709884378154&hvpos=&hvnetw=g&hvrand=8926613083410050335&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9198625&hvtargid=pla-2372741540376&psc=1&language=pt_BR",
    case: {
      create: {
        supportedSizes: "ATX, Micro-ATX, Mini-ITX",
        maxGpuLengthMM: 350
      }
    }
  }
];

(async () => {
  for (let i = 0; i < parts.length; i++) {
    console.log(`Adicionando peça número ${i + 1}/${parts.length}`);
    await seedPart(parts[i]);
  }
})();
