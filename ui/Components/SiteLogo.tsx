'use client'
import React from 'react'
import Image from 'next/image'
function SiteLogo() {
  return (
    <div>
          <Image
                    priority
                    src="/images/logo_black-asc.png"
                    width={64}
                    height={32}
                    alt="asc-logo"
                    className="visible dark:hidden h-auto w-auto"
                  />
                  <Image
                    priority
                    src="/images/logo_white-asc.png"
                    width={64}
                    height={32}
                    alt="asc-logo"
                    className="hidden dark:block h-auto w-auto"
                  />
    </div>
  )
}

export function SiteLogoLarge() {
    return (
      <div>
            <Image
                      priority
                      src="/images/logo_black-asc.png"
                      width={200}
                      height={100}
                      alt="asc-logo"
                      className="visible dark:hidden h-auto w-auto"
                    />
                    <Image
                      priority
                      src="/images/logo_white-asc.png"
                      width={200}
                      height={100}
                      alt="asc-logo"
                      className="hidden dark:block h-auto w-auto"
                    />
      </div>
    )
  }
  

export default SiteLogo