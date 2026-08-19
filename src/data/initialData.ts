import { Product, Category, Brand, ActivityItem } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'MacBook Pro 14" M3 Pro',
    brand: 'Apple',
    brandSlug: 'apple',
    sku: 'MBP-14-M3P-512',
    category: 'Electronics',
    price: 1999.00,
    stock: 45,
    status: 'active',
    rating: 4.9,
    reviewsCount: 128,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaCU6erEmZq3gWgkFpmild6rRMFcWL-x-9N063RDeKzzGsJ8o0DZadb8CAIhCFLkDl2I_YfionGNO-hItQ7a_4hoAaH7KwpzKK6mN861h0HzzBCUlifoooqc9cOCvys2lLyEgNffZVoVtXAEIGOF1fbmOrsapDhWEBULsrHtrBsfuE0nw8nQqxPMAuGu3FvQ0WBz0iSCsO_2ugOBUSz1RS2yGj8ilO2wZ6AhER4n79GEe113M_fZQb',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAaCU6erEmZq3gWgkFpmild6rRMFcWL-x-9N063RDeKzzGsJ8o0DZadb8CAIhCFLkDl2I_YfionGNO-hItQ7a_4hoAaH7KwpzKK6mN861h0HzzBCUlifoooqc9cOCvys2lLyEgNffZVoVtXAEIGOF1fbmOrsapDhWEBULsrHtrBsfuE0nw8nQqxPMAuGu3FvQ0WBz0iSCsO_2ugOBUSz1RS2yGj8ilO2wZ6AhER4n79GEe113M_fZQb',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAPEt0EMDfnnftxdPV3VGueSbpep3995GSapbSEIm_90kiO76rWcyr74seRUvDEWCP7vEKuIjYicfbjBlKKx64CQIqAcVlRbzNqevlhd3poyNdPykw0qfTxMn3sfsdp_CGn-v5rfU0m0ucqaHWlvCNF_mTxIS44I8_iWODTuiYwM-30EWoD9kkCRbkivdBqDRIDe6Vgia0ypuCrIlNd9NSSMHqlZEISPT16dCx4W2Z4qdOcA_7DsV9d',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCvrA4kyTuIz0V7ozkYGwMnsqLYgaCINrC2blAXUNXiAb61Fu7Zj_m4ZX7B69ERcIfuoOxf0F5zQPX8Qj7W6Ch5zlkmAoSVDx6D1ynfPR42fhtuFTPNjNKZDRQdaEognrbKyeqqW942KI1OWJYZeelrDP9kJ44r66wWRXs5Omusr_6N5C4dXkbwLKqBeojNAmqXKeNfbTDyOaYmxJSwM6i1D2AQxawDhddv2gQoJ0BiTFmOqNxgbgIC',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDNfBIxiFJwe-GyU3OCAzz253QMShonmfh9aW6xcmCGr83_TpTepXSWBjRKiQoQWeC5UnDOAyLQ1ScPYKoX2lhdUZ5uzhL2m2Ye-LyCyRV2Zvy4paXlVjEkmQ3scUCyg0B8O9PWI5ooeV2HGq7LxxK8_uKTqtsvxPRHPJ34J_U_3UWyvamJOxgQv8-fxWCJu6FoWo6-xRqor0R0mZu45RBHbJiMJh9VzKFYyH4pmzDcD5XqetmjsKkx',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCmbtFeHG2ARk0sFtqLV-ovXxTF_Vtqn03ihNmMenkHjQ69PagUeNBgp0sI5ICAaY4PULtXs3GNvRkTMlc3I6Pv8lE6V4UoiMcZNmQUBpon7Ubs0fvdVZHeD9XLcvdI_G5K4TRyaHwKIZi1Epk5mGFrmQ1aGjIJ6bKeTQCMHgZaU05XKE84DWUmxiwQx-U55QOOxkYvddEesrkk5o_k816Wijr3gQI8UxsEw_J6UvTohWdqS7law793'
    ],
    description: 'Mind-blowing. Head-turning. The 14-inch MacBook Pro blasts forward with M3 Pro, a radically advanced chip that brings massive performance and capabilities for extreme workflows.\n\nWith class-leading battery life—up to 18 hours—and a beautiful Liquid Retina XDR display, it\'s an absolute beast of a pro laptop. Now available in a new color: Space Black.',
    highlights: [
      'Apple M3 Pro chip with 11-core CPU, 14-core GPU',
      '18GB Unified Memory, 512GB SSD Storage',
      '14.2-inch Liquid Retina XDR display with ProMotion 120Hz',
      'MagSafe 3 charging, three Thunderbolt 4 ports, HDMI port, SDXC card slot',
      '1080p FaceTime HD camera and studio-quality three-mic array'
    ],
    specs: {
      sku: 'MBP-14-M3P-512',
      weight: '3.5 lbs (1.61 kg)',
      dimensions: '0.61 x 12.31 x 8.71 in',
      processor: 'Apple M3 Pro (11-core CPU, 14-core GPU)',
      memory: '18GB Unified RAM',
      storage: '512GB NVMe SSD',
      display: '14.2" Liquid Retina XDR (3024x1964)',
      connectivity: 'Wi-Fi 6E (802.11ax), Bluetooth 5.3'
    },
    createdAt: 'Oct 24, 2023',
    updatedAt: 'Nov 15, 2023'
  },
  {
    id: 'prod-2',
    name: 'Aura Pro Noise Cancelling Headphones',
    brand: 'Sony Electronics',
    brandSlug: 'sony',
    sku: 'AP-NC-B-001',
    category: 'Electronics',
    price: 299.00,
    stock: 45,
    status: 'active',
    rating: 4.8,
    reviewsCount: 94,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGaKG8T4OWIiVfnGhMl4FDwYFvOEFQi2F6Z763eHMFnHH6caJcZNbSVt1k-Y69jMnBfkD9vMEv9XHLRCp0ga1MCWYVFw5Ai8-hzSl9sjuCKUSIxMaeP7Hhw1lm1skSkeByWvaPWLOKlYNZs0jj2DnOWYLAWnmSGkjR8JQnvp26FyPLvmyVSw6rWYkqMSTKFXG3WQGSblsw3bM2PRS0napZMzZDvB1aHCVbnqyK35ctbi6t4cXVDMTc',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCGaKG8T4OWIiVfnGhMl4FDwYFvOEFQi2F6Z763eHMFnHH6caJcZNbSVt1k-Y69jMnBfkD9vMEv9XHLRCp0ga1MCWYVFw5Ai8-hzSl9sjuCKUSIxMaeP7Hhw1lm1skSkeByWvaPWLOKlYNZs0jj2DnOWYLAWnmSGkjR8JQnvp26FyPLvmyVSw6rWYkqMSTKFXG3WQGSblsw3bM2PRS0napZMzZDvB1aHCVbnqyK35ctbi6t4cXVDMTc'
    ],
    description: 'Industry-leading noise cancellation optimized to you with Dual Noise Sensor technology. Next-level music with Edge-AI and DSEE Extreme upscaling real-time audio files with spatial acoustics.',
    highlights: [
      'Industry-leading active noise cancellation',
      'Up to 30-hour battery life with quick charging',
      'Touch sensor controls to pause/play/skip tracks and answer calls',
      'Multipoint connection pairs with two Bluetooth devices at once'
    ],
    specs: {
      sku: 'AP-NC-B-001',
      weight: '8.95 oz (254g)',
      dimensions: '9.94 x 3.03 x 7.34 in',
      connectivity: 'Bluetooth 5.2, 3.5mm Aux',
      warranty: '1 Year Manufacturer Limited'
    },
    createdAt: 'Nov 02, 2023',
    updatedAt: 'Dec 01, 2023'
  },
  {
    id: 'prod-3',
    name: 'Keychron K3 Ultra-slim Mechanical Keyboard',
    brand: 'Keychron',
    brandSlug: 'keychron',
    sku: 'KK-3-W-002',
    category: 'Accessories',
    price: 84.00,
    stock: 3,
    status: 'active',
    rating: 4.7,
    reviewsCount: 62,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByF-XgTULDeryhfuXCTltIZCvSjnlNhvINNYRaRfEubqIJCkQDGpxmr50JYCvyid7XbuRwEW3KE_Liyo7I9nO0wPr5s0XpWN_epndk1Rtvu79LOMXmaFYIeH13uBubqh9UpjpP1Si9iXQX1wBkRYrkHPEw1pdC00UX8eYCVDXELxIgw4y437ziph0G8lfjmDGcDEObvPQRDm3eZXy5PyltB34tQGfkrsIJXad45Ub8J3gtJVwdEPfA',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuByF-XgTULDeryhfuXCTltIZCvSjnlNhvINNYRaRfEubqIJCkQDGpxmr50JYCvyid7XbuRwEW3KE_Liyo7I9nO0wPr5s0XpWN_epndk1Rtvu79LOMXmaFYIeH13uBubqh9UpjpP1Si9iXQX1wBkRYrkHPEw1pdC00UX8eYCVDXELxIgw4y437ziph0G8lfjmDGcDEObvPQRDm3eZXy5PyltB34tQGfkrsIJXad45Ub8J3gtJVwdEPfA'
    ],
    description: 'An ultra-slim wireless mechanical keyboard with low profile optical switches and 75% layout. Connects via Bluetooth 5.1 and easily switches between Mac and Windows operating systems.',
    highlights: [
      '75% Compact layout with dedicated navigation arrows',
      'Low profile Gateron mechanical switches',
      'Connects up to 3 devices simultaneously via Bluetooth 5.1',
      'Reinforced aluminum body structure'
    ],
    specs: {
      sku: 'KK-3-W-002',
      weight: '1.09 lbs (496g)',
      dimensions: '12.04 x 4.56 x 0.86 in',
      connectivity: 'Bluetooth 5.1 & Type-C Wired',
      material: 'Aircraft-grade Aluminum Frame'
    },
    createdAt: 'Nov 10, 2023',
    updatedAt: 'Nov 28, 2023'
  },
  {
    id: 'prod-4',
    name: 'Keychron K8 Pro QMK/VIA Keyboard',
    brand: 'Keychron',
    brandSlug: 'keychron',
    sku: 'KBD-001',
    category: 'Electronics',
    price: 99.00,
    stock: 28,
    status: 'active',
    rating: 4.9,
    reviewsCount: 88,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCQNjzcu9Nr3-B9aN-CO005CgmFVN1s3WGjor9q12nHNCHY3l4BtkC4u6oDQn2Pf0s7VaBHWoi81rWLNblG94fk78vpC7hTyAtqMBPUPDGz2ZbazOKMfZxv9QSjcqXPi_Ajyd4ZYxUp0nwPul9-EGx99WRZu8XvolnnLLx3xvg6Q3xEOtXB5kw8y4wJwZetfrVUmvVv5c-s4Q0lyMb07R_VzrDzumEO-FKCZCJhswQZ-5QJAmQ9SNu',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDCQNjzcu9Nr3-B9aN-CO005CgmFVN1s3WGjor9q12nHNCHY3l4BtkC4u6oDQn2Pf0s7VaBHWoi81rWLNblG94fk78vpC7hTyAtqMBPUPDGz2ZbazOKMfZxv9QSjcqXPi_Ajyd4ZYxUp0nwPul9-EGx99WRZu8XvolnnLLx3xvg6Q3xEOtXB5kw8y4wJwZetfrVUmvVv5c-s4Q0lyMb07R_VzrDzumEO-FKCZCJhswQZ-5QJAmQ9SNu'
    ],
    description: 'The Keychron K8 Pro is a QMK/VIA wireless mechanical keyboard paving the way for a new era for mechanical keyboards. Custom-tailor any key or macro command effortlessly.',
    highlights: [
      'QMK & VIA programmable support out of the box',
      'Hot-swappable PCB socket for 3-pin and 5-pin switches',
      'Upgraded sound-absorbing foam and silicone bottom pad',
      'South-facing RGB backlight LEDs'
    ],
    specs: {
      sku: 'KBD-001',
      weight: '2.5 lbs (1.14 kg)',
      dimensions: '14.1 x 5.0 x 1.6 in',
      connectivity: 'Bluetooth 5.1 / USB Type-C',
      material: 'Aluminum Frame, Double-shot PBT Keycaps'
    },
    createdAt: 'Nov 12, 2023',
    updatedAt: 'Dec 04, 2023'
  },
  {
    id: 'prod-5',
    name: 'Logitech MX Master 3S',
    brand: 'Logitech',
    brandSlug: 'logitech',
    sku: 'MSE-042',
    category: 'Accessories',
    price: 129.99,
    stock: 52,
    status: 'active',
    rating: 4.9,
    reviewsCount: 210,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9X4X95QTUkuoaAQ8WOsid-RhHAJbzDA9HMkryLJAmcsHA7OQbpdIVr9pNoRTSNCzNzWDbLVL7AsnEMht3RvOzI2TjJznzCH5xZjFHmH7AIpjXE7WyEu1iO0f2tz1B4xup6T0WESuJnN6hTCZWZM14g0nQ6e3lIrntwhtxapp9mctPGqIHEayqI0cSg1U9hnMMXhtdJW9Tyk6hWPYkrdX3gZQBD9ELEWf_gQQRjUrZID1RtKAAvrhg',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA9X4X95QTUkuoaAQ8WOsid-RhHAJbzDA9HMkryLJAmcsHA7OQbpdIVr9pNoRTSNCzNzWDbLVL7AsnEMht3RvOzI2TjJznzCH5xZjFHmH7AIpjXE7WyEu1iO0f2tz1B4xup6T0WESuJnN6hTCZWZM14g0nQ6e3lIrntwhtxapp9mctPGqIHEayqI0cSg1U9hnMMXhtdJW9Tyk6hWPYkrdX3gZQBD9ELEWf_gQQRjUrZID1RtKAAvrhg'
    ],
    description: 'An iconic mouse remastered with Quiet Clicks and 8,000 DPI track-on-glass sensor. MagSpeed electromagnetic scrolling delivers extraordinary speed, precision, and near-silence.',
    highlights: [
      '8K DPI any-surface tracking, even on glass',
      'Quiet Clicks with 90% less click noise',
      'MagSpeed scrolling - scroll 1,000 lines per second',
      'App-specific customizations with Logi Options+'
    ],
    specs: {
      sku: 'MSE-042',
      weight: '4.97 oz (141g)',
      dimensions: '4.92 x 3.32 x 2.0 in',
      connectivity: 'Bluetooth Low Energy & Logi Bolt USB',
      battery: '500 mAh Li-Po (Up to 70 days)'
    },
    createdAt: 'Oct 15, 2023',
    updatedAt: 'Nov 20, 2023'
  },
  {
    id: 'prod-6',
    name: 'Dell UltraSharp 34" Curved Monitor',
    brand: 'Dell',
    brandSlug: 'dell',
    sku: 'MON-018',
    category: 'Electronics',
    price: 849.00,
    stock: 4,
    status: 'active',
    rating: 4.8,
    reviewsCount: 75,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeSbkvGnaZNkHK1_DQ4j8aFXoR6Q05TMxVMPJ3WYhOT1Jh1cOzlvNOojbGqF5krkriIsl7PhfMaNtDYuvcGWhoXvZVR559CjItoQn_ss9LScVAMryc9j1DOakTQ0xC7REuoVuMtMG6bRd-liKKtMolWeA8gXFRv6fNcUnJ0y6z9nB5Ny0Pfkg2-VL2VbW8gOIoYpF3ck-mE5UvFhm5Bgg4Vjx4nsOJ6eQ-s4MrSBiyvjVwrYwDpVda',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCeSbkvGnaZNkHK1_DQ4j8aFXoR6Q05TMxVMPJ3WYhOT1Jh1cOzlvNOojbGqF5krkriIsl7PhfMaNtDYuvcGWhoXvZVR559CjItoQn_ss9LScVAMryc9j1DOakTQ0xC7REuoVuMtMG6bRd-liKKtMolWeA8gXFRv6fNcUnJ0y6z9nB5Ny0Pfkg2-VL2VbW8gOIoYpF3ck-mE5UvFhm5Bgg4Vjx4nsOJ6eQ-s4MrSBiyvjVwrYwDpVda'
    ],
    description: 'Immerse yourself in productivity with this expansive 34-inch curved WQHD monitor featuring USB-C hub connectivity, built-in dual speakers, and ComfortView Plus eye care technology.',
    highlights: [
      '34-inch WQHD (3440 x 1440) 21:9 curved IPS panel',
      'USB-C hub delivers up to 90W power delivery',
      'Integrated RJ45 Ethernet and KVM switch',
      '99% sRGB color gamut calibration delta-E < 2'
    ],
    specs: {
      sku: 'MON-018',
      weight: '24.9 lbs (11.3 kg)',
      dimensions: '32.0 x 15.4 x 9.3 in (with stand)',
      display: '34" Curved IPS WQHD (3440 x 1440)',
      connectivity: 'USB-C, HDMI 2.1, DisplayPort 1.4, RJ45'
    },
    createdAt: 'Nov 05, 2023',
    updatedAt: 'Nov 29, 2023'
  },
  {
    id: 'prod-7',
    name: 'ErgoLift Standing Desk Pro',
    brand: 'Uplift',
    brandSlug: 'uplift',
    sku: 'UP-SD-B-105',
    category: 'Furniture',
    price: 549.00,
    stock: 0,
    status: 'draft',
    rating: 4.6,
    reviewsCount: 38,
    image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=600&auto=format&fit=crop&q=80'
    ],
    description: 'Electric height adjustable standing desk with dual motors, solid hardwood desktop, digital memory keypad, and integrated cable management routing system.',
    highlights: [
      'Dual whisper-quiet electric lifting motors',
      'Adjustable height from 25.3" to 50.9"',
      '355 lbs lifting capacity with anti-collision safety',
      '4-memory programmable digital keypad'
    ],
    specs: {
      sku: 'UP-SD-B-105',
      weight: '98 lbs (44.5 kg)',
      dimensions: '60.0 x 30.0 x 25.3-50.9 in',
      material: 'Solid Walnut Top & Steel Frame'
    },
    createdAt: 'Oct 18, 2023',
    updatedAt: 'Nov 14, 2023'
  },
  {
    id: 'prod-8',
    name: 'HyperX Cloud II Wireless Headset',
    brand: 'HyperX',
    brandSlug: 'hyperx',
    sku: 'HPX-CL2-08',
    category: 'Gaming',
    price: 149.99,
    stock: 36,
    status: 'active',
    rating: 4.8,
    reviewsCount: 154,
    image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1599669454699-248893623440?w=600&auto=format&fit=crop&q=80'
    ],
    description: 'Legendary comfort paired with fast 2.4GHz wireless freedom. High-definition 53mm drivers and DTS Headphone:X Spatial Audio deliver exceptional gaming clarity.',
    highlights: [
      'Gaming-grade 2.4GHz low-latency wireless connection',
      'Up to 300 hours of battery life on a single charge',
      'Signature HyperX memory foam and premium leatherette',
      'DTS Headphone:X Spatial Audio'
    ],
    specs: {
      sku: 'HPX-CL2-08',
      weight: '10.5 oz (300g)',
      dimensions: '7.5 x 5.8 x 3.8 in',
      connectivity: '2.4GHz USB Dongle Wireless',
      battery: 'Rechargeable 300-hour Lithium'
    },
    createdAt: 'Nov 20, 2023',
    updatedAt: 'Dec 02, 2023'
  },
  {
    id: 'prod-9',
    name: 'Sony Alpha 7 IV Full-Frame Mirrorless',
    brand: 'Sony Electronics',
    brandSlug: 'sony',
    sku: 'SNY-A7M4-01',
    category: 'Electronics',
    price: 2498.00,
    stock: 2,
    status: 'active',
    rating: 4.9,
    reviewsCount: 67,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80'
    ],
    description: 'An ideal all-arounder that pushes beyond basic with 33MP Exmor R sensor, 4K 60p video, real-time AI autofocus tracking for humans, animals, and birds.',
    highlights: [
      '33MP full-frame Exmor R back-illuminated CMOS sensor',
      'BIONZ XR image processing engine with 8x more processing power',
      '4K 60p 10-bit 4:2:2 recording with full pixel readout',
      '759-point phase-detection autofocus with 94% coverage'
    ],
    specs: {
      sku: 'SNY-A7M4-01',
      weight: '1.45 lbs (658g)',
      dimensions: '5.18 x 3.8 x 3.14 in',
      sensor: '33.0 Megapixel 35mm Full Frame',
      connectivity: 'Wi-Fi 5GHz, Bluetooth 5.0, USB 3.2 Gen 2 Type-C'
    },
    createdAt: 'Oct 30, 2023',
    updatedAt: 'Dec 03, 2023'
  },
  {
    id: 'prod-10',
    name: 'Aeron Ergonomic Task Chair',
    brand: 'Herman Miller',
    brandSlug: 'herman-miller',
    sku: 'HM-AER-B-01',
    category: 'Furniture',
    price: 1695.00,
    stock: 15,
    status: 'active',
    rating: 4.9,
    reviewsCount: 312,
    image: 'https://images.unsplash.com/photo-1580481077194-46b15801c4a0?w=600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1580481077194-46b15801c4a0?w=600&auto=format&fit=crop&q=80'
    ],
    description: 'The benchmark for ergonomic seating. Pellicle 8Z suspension and PostureFit SL back support keep the spine aligned in a natural forward tilt.',
    highlights: [
      'Pellicle 8Z breathable mesh distributes weight evenly',
      'PostureFit SL lumbar support stabilizes sacrum and spine',
      'Fully adjustable arms (height, depth, and pivot angle)',
      '12-year 3-shift warranty'
    ],
    specs: {
      sku: 'HM-AER-B-01',
      weight: '41 lbs (18.6 kg)',
      dimensions: '41.0 x 27.0 x 27.0 in',
      material: 'Recycled Aluminum & Pellicle Elastomeric Mesh',
      warranty: '12-Year Herman Miller Official'
    },
    createdAt: 'Sep 15, 2023',
    updatedAt: 'Nov 08, 2023'
  }
];

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Electronics',
    description: 'Mobile phones, tablets, laptops, and accessories.',
    iconName: 'smartphone',
    productCount: 452,
    status: 'active',
    parentCategory: 'None (Top Level)',
    createdAt: 'Oct 12, 2023'
  },
  {
    id: 'cat-2',
    name: 'Accessories',
    description: 'Keyboards, mice, docks, cases, and workstation gear.',
    iconName: 'keyboard',
    productCount: 320,
    status: 'active',
    parentCategory: 'Electronics',
    createdAt: 'Sep 20, 2023'
  },
  {
    id: 'cat-3',
    name: 'Furniture',
    description: 'Living room, bedroom, and office furniture items.',
    iconName: 'chair',
    productCount: 210,
    status: 'active',
    parentCategory: 'None (Top Level)',
    createdAt: 'Sep 05, 2023'
  },
  {
    id: 'cat-4',
    name: 'Apparel',
    description: "Men's, women's, and children's clothing.",
    iconName: 'checkroom',
    productCount: 890,
    status: 'inactive',
    parentCategory: 'None (Top Level)',
    createdAt: 'Nov 22, 2023'
  },
  {
    id: 'cat-5',
    name: 'Gaming',
    description: 'Consoles, games, and gaming accessories.',
    iconName: 'sports_esports',
    productCount: 315,
    status: 'active',
    parentCategory: 'Electronics',
    createdAt: 'Jan 14, 2024'
  },
  {
    id: 'cat-6',
    name: 'Displays',
    description: 'Monitors, screens, color-calibrated panels, and mounts.',
    iconName: 'monitor',
    productCount: 145,
    status: 'active',
    parentCategory: 'Electronics',
    createdAt: 'Aug 19, 2023'
  },
  {
    id: 'cat-7',
    name: 'Audio',
    description: 'Studio headphones, microphones, DACs, and speakers.',
    iconName: 'headphones',
    productCount: 198,
    status: 'active',
    parentCategory: 'Electronics',
    createdAt: 'Oct 01, 2023'
  },
  {
    id: 'cat-8',
    name: 'Smart Home',
    description: 'IoT hubs, security systems, smart lighting, and thermostat controls.',
    iconName: 'home',
    productCount: 88,
    status: 'active',
    parentCategory: 'None (Top Level)',
    createdAt: 'Dec 11, 2023'
  }
];

export const INITIAL_BRANDS: Brand[] = [
  {
    id: 'brand-1',
    name: 'TechNova',
    slug: 'tech-nova',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZVjfPMwGuMIX8Qcs1kNvrL_5Jzeaxvb4Q0np4Xo42ttovCE_CDV8ZnYk8YjH4fAxdouwMv3dGhF1HnULevTbEFf8jm9lIaiXcuGLzC7iis1CYEWOn4GjNGE8TzBjFW7lEqJDkPCNSQD3y3ABfZshEp7c2x5f0NpcKy-ZQK6VYIB7A7We79xEruxk5jBG0RizqqBbG-7PQrjXKGSC-YaTv3n9-zsRWB-AhbfMyoucuyxXFsqJ-AtUe',
    productCount: 1245,
    status: 'active',
    isSpotlight: true,
    createdAt: 'Oct 12, 2023'
  },
  {
    id: 'brand-2',
    name: 'Lumina Life',
    slug: 'lumina-life',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhVE8mKIAGRtshzWG8vx1METLk_ZiThnXzwm0VmjBp7y6LReuAdQ4kPZi6zqGK30FE_nFgknDzJvX4nh8tHB2bo8sQP04xH1wwZHZWYKKn4fZccSb3L11u2sWFnoYVWhoHhCY75jyJcwOL5GKEHVjaTVmzCzs6oeu2aaDcxoTPbuL_1n81Zoe_WSRUhjEfyoc9fubeFsIpkLSO0sBDWM3H1zCntpOfzzZA8snqLd0j9nx58rFKBqeX',
    productCount: 856,
    status: 'active',
    isSpotlight: true,
    createdAt: 'Sep 04, 2023'
  },
  {
    id: 'brand-3',
    name: 'EcoWear',
    slug: 'eco-wear',
    logo: '',
    productCount: 32,
    status: 'draft',
    isSpotlight: false,
    createdAt: 'Nov 22, 2023'
  },
  {
    id: 'brand-4',
    name: 'Apex Sports',
    slug: 'apex-sports',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcZXw-qCkUV-J5yzCTu5oWEw1KwkJl97EKl6fWNBcG9OSnDx4aNN20vfYATt2SNRMdUBwKL7VVaZd-TEzaYYyE96bNUuETucLge3PblhKvGb9T59k5fYBbJ0nTLrTXpC8sKLGhxqBuTMwez5M5PHqg6A6B43dvUOG2bcWlMwo2xSfg11rs988S2m2gQHnLhXZdtnSyEALOkoeUv_MGBKsVQ11c-FwMlqhV1kkgmob76dt2jp6F7hQl',
    productCount: 0,
    status: 'archived',
    isSpotlight: false,
    createdAt: 'Jan 15, 2022'
  },
  {
    id: 'brand-5',
    name: 'Apple',
    slug: 'apple',
    logo: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=100&auto=format&fit=crop&q=80',
    productCount: 184,
    status: 'active',
    isSpotlight: true,
    createdAt: 'Aug 10, 2023'
  },
  {
    id: 'brand-6',
    name: 'Sony Electronics',
    slug: 'sony',
    logo: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100&auto=format&fit=crop&q=80',
    productCount: 96,
    status: 'active',
    isSpotlight: false,
    createdAt: 'Aug 15, 2023'
  },
  {
    id: 'brand-7',
    name: 'Keychron',
    slug: 'keychron',
    logo: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=100&auto=format&fit=crop&q=80',
    productCount: 42,
    status: 'active',
    isSpotlight: false,
    createdAt: 'Sep 10, 2023'
  },
  {
    id: 'brand-8',
    name: 'Logitech',
    slug: 'logitech',
    logo: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=100&auto=format&fit=crop&q=80',
    productCount: 65,
    status: 'active',
    isSpotlight: false,
    createdAt: 'Sep 12, 2023'
  }
];

export const INITIAL_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    type: 'add',
    title: 'New product added',
    targetName: 'HyperX Cloud II Wireless',
    actor: 'By admin user',
    timeAgo: '2 mins ago',
    timestamp: '2026-08-19T07:50:00Z'
  },
  {
    id: 'act-2',
    type: 'stock',
    title: 'Stock updated for',
    targetName: 'MacBook Pro 14"',
    actor: 'System automated',
    timeAgo: '45 mins ago',
    timestamp: '2026-08-19T07:05:00Z'
  },
  {
    id: 'act-3',
    type: 'warning',
    title: 'Low stock alert:',
    targetName: 'Sony A7IV',
    actor: 'System automated',
    timeAgo: '2 hours ago',
    timestamp: '2026-08-19T05:50:00Z'
  },
  {
    id: 'act-4',
    type: 'update',
    title: 'Category re-indexed:',
    targetName: 'Accessories & Peripherals',
    actor: 'By admin user',
    timeAgo: '4 hours ago',
    timestamp: '2026-08-19T03:50:00Z'
  },
  {
    id: 'act-5',
    type: 'add',
    title: 'Brand catalog registered:',
    targetName: 'TechNova Global',
    actor: 'By admin user',
    timeAgo: 'Yesterday at 4:15 PM',
    timestamp: '2026-08-18T16:15:00Z'
  }
];

export const LOGO_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCY1yCVp4Qj_F-GsMqj9R1Ysgn1Gean2T6ZBSZy3b3NCEG_BCjd3OA2FnWxLtk3fryWG6Sgz5pogm3Ul5AEBhJXae37CQpZ4CMdSLHKOWioHHtPUgj0ILPPSnyiIbMr9mVuS_V--nr5nRmzlQPQh9P2u62YB5N-Lk6lNe2FsoHG1s8RHz_FoIID5geqAx2zgaLSXon4vJA9N388YAqZXfrHJjdVKtu-IeqxFW-NsoVzKgF8uTjrUAbz';
export const USER_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBE3ULktRCnG5eHhVhVgm7Ci8qKP_r25iuNQvMDrbyoJaBBX0P8VbXhbTr7xH2PGNaMASorTvs3bv_-_0EaU97YCyqdJfqKftolDQC9o8P_VFtkpRG6x8rc98tuvpXfJuH0gIMyIXAgjlBDENLiOzKYC2EpnxbGpLCvzB0rUT4paAqZQNhzKqdrstwNYiTtEv9GyF4sbjz9Ya0CcqwlY0q4RVppUYOltmzuMQd9U7gY67DgbMsqW-I';
