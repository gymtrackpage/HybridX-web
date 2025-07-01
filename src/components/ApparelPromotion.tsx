'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shirt, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Script from 'next/script';
import { useEffect } from 'react';

// To satisfy typescript for the Ecwid script
declare global {
  interface Window {
    xProduct?: () => void;
  }
}

export default function ApparelPromotion() {
  // useEffect to re-initialize widgets on client-side navigation or re-render
  useEffect(() => {
    if (typeof window.xProduct === 'function') {
      window.xProduct();
    }
  }); // Run on every render to ensure widgets are initialized if component re-renders.

  return (
    <>
      <section id="apparel-promotion" className="py-20 md:py-28 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <Shirt className="h-16 w-16 text-accent mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-3">
              Gear Up. Look the Part.
            </h2>
            <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
              Train in comfort and style with the official HybridX apparel collection. High-performance gear designed for the hybrid athlete.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* First Product */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden bg-card/80 backdrop-blur-sm group border-t-2 border-primary/30">
              <CardContent className="p-4 flex-grow flex items-center justify-center">
                <div 
                  className="ecsp ecsp-SingleProduct-v2 ecsp-SingleProduct-v2-bordered ecsp-SingleProduct-v2-centered ecsp-Product ec-Product-743426001" 
                  itemScope 
                  itemType="http://schema.org/Product" 
                  data-single-product-id="743426001">
                  <div itemProp="image"></div>
                  <div className="ecsp-title" itemProp="name" content="HybridX basketball jersey"></div>
                  <div itemType="http://schema.org/Offer" itemScope itemProp="offers">
                    <div className="ecsp-productBrowser-price ecsp-price" itemProp="price" content="25" data-spw-price-location="button">
                      <div itemProp="priceCurrency" content="GBP"></div>
                    </div>
                  </div>
                  <div customprop="options"></div>
                  <div customprop="qty"></div>
                  <div customprop="addtobag"></div>
                  <div customprop="vatinprice"></div>
                </div>
              </CardContent>
            </Card>

            {/* Second Product */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden bg-card/80 backdrop-blur-sm group border-t-2 border-primary/30">
              <CardContent className="p-4 flex-grow flex items-center justify-center">
                <div 
                  className="ecsp ecsp-SingleProduct-v2 ecsp-SingleProduct-v2-bordered ecsp-SingleProduct-v2-centered ecsp-Product ec-Product-739862435" 
                  itemScope 
                  itemType="http://schema.org/Product" 
                  data-single-product-id="739862435">
                  <div itemProp="image"></div>
                  <div className="ecsp-title" itemProp="name" content="HybridX Solo Hat"></div>
                  <div itemType="http://schema.org/Offer" itemScope itemProp="offers">
                    <div className="ecsp-productBrowser-price ecsp-price" itemProp="price" content="18" data-spw-price-location="button">
                      <div itemProp="priceCurrency" content="GBP"></div>
                    </div>
                  </div>
                  <div customprop="options"></div>
                  <div customprop="qty"></div>
                  <div customprop="addtobag"></div>
                  <div customprop="vatinprice"></div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-12">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                  <Link href="/store">
                      Shop The Collection <ArrowUpRight className="ml-2 h-5 w-5" />
                  </Link>
              </Button>
          </div>
        </div>
      </section>
      
      {/* Script to load Ecwid functionality and initialize the widgets */}
      <Script 
        id="ecwid-single-product-script"
        strategy="lazyOnload"
        src="https://app.ecwid.com/script.js?112581013&data_platform=singleproduct_v2"
        onLoad={() => {
          if (typeof window.xProduct === 'function') {
            window.xProduct();
          }
        }}
      />
    </>
  );
}
