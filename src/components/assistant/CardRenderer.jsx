'use client'

import React from 'react'
import Link from 'next/link'
import {
  ExternalLink,
  ArrowRight,
  Sparkles,
  Building2,
  Palmtree,
  UtensilsCrossed,
  Store,
  Rocket,
  Brain,
  Check,
  MessageSquare,
  Calculator,
  Mail,
} from 'lucide-react'
import { CARD_REGISTRY } from '../../data/assistantKnowledge'
import styles from './AssistantWidget.module.css'

const ICON_MAP = {
  'service:real-estate': Building2,
  'service:hotel-resort': Palmtree,
  'service:cafe-restaurant': UtensilsCrossed,
  'service:small-business': Store,
  'service:landing-pages': Rocket,
  'service:ai-ml': Brain,
  'action:estimator': Calculator,
  'action:contact': Mail,
}

export default function CardRenderer({ cardKey, onNavigate }) {
  const cardData = CARD_REGISTRY[cardKey]

  if (!cardData) {
    return null
  }

  const IconComponent = ICON_MAP[cardKey] || Sparkles

  // 1. Service & Package Cards
  if (cardData.type === 'service' || cardData.type === 'package') {
    return (
      <div className={styles.interactiveCard}>
        <div className={styles.cardTopRow}>
          <div className={styles.cardIdentity}>
            <div className={styles.cardIconBox}>
              <IconComponent size={18} />
            </div>
            <div>
              <div className={styles.cardCat}>{cardData.category}</div>
              <h4 className={styles.cardTitle}>{cardData.title}</h4>
            </div>
          </div>
          {cardData.badge && <span className={styles.badgePill}>{cardData.badge}</span>}
        </div>

        <p className={styles.cardDesc}>{cardData.desc}</p>

        {cardData.features && (
          <ul className={styles.featuresList}>
            {cardData.features.slice(0, 3).map((feat, idx) => (
              <li key={idx} className={styles.featureItem}>
                <Check size={13} className={styles.featureCheck} />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        )}

        <div className={styles.cardFooter}>
          <div>
            <div className={styles.priceLabel}>Pricing</div>
            <div className={styles.priceVal}>{cardData.price}</div>
          </div>

          <div className={styles.cardActions}>
            <Link
              href={cardData.route}
              onClick={() => onNavigate && onNavigate(cardData.route)}
              className={styles.btnSecondary}
            >
              <span>Details</span>
              <ArrowRight size={12} />
            </Link>

            {cardData.whatsappMessage && (
              <a
                href={`https://wa.me/917205252871?text=${encodeURIComponent(cardData.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnPrimary}
              >
                <MessageSquare size={13} />
                <span>Enquire</span>
              </a>
            )}
          </div>
        </div>
      </div>
    )
  }

  // 2. Project Cards
  if (cardData.type === 'project') {
    return (
      <div className={styles.interactiveCard}>
        <div className={styles.cardTopRow}>
          <div>
            <div className={styles.cardCat}>{cardData.category}</div>
            <h4 className={styles.cardTitle}>{cardData.title}</h4>
          </div>
          {cardData.stats && <span className={styles.badgePill}>{cardData.stats}</span>}
        </div>

        <p className={styles.cardDesc}>{cardData.desc}</p>

        {cardData.tags && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8 }}>
            {cardData.tags.map((tag, idx) => (
              <span
                key={idx}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  color: '#A8A29E',
                  fontSize: '0.65rem',
                  padding: '1px 6px',
                  borderRadius: 4,
                  fontFamily: 'var(--font-mono, monospace)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className={styles.cardFooter}>
          <Link
            href={cardData.route}
            onClick={() => onNavigate && onNavigate(cardData.route)}
            className={styles.btnSecondary}
          >
            <span>Explore Case Study</span>
            <ArrowRight size={12} />
          </Link>

          {cardData.externalUrl && (
            <a
              href={cardData.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnPrimary}
            >
              <span>Live Demo</span>
              <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
    )
  }

  // 3. Action Cards (Estimator & Contact)
  if (cardData.type === 'action') {
    return (
      <div
        className={styles.interactiveCard}
        style={{
          background: 'linear-gradient(135deg, rgba(38, 26, 18, 0.95) 0%, rgba(20, 18, 24, 0.95) 100%)',
          borderColor: 'rgba(255, 107, 0, 0.5)',
        }}
      >
        <div className={styles.cardTopRow}>
          <div className={styles.cardIdentity}>
            <div className={styles.cardIconBox}>
              <IconComponent size={18} />
            </div>
            <div>
              <h4 className={styles.cardTitle}>{cardData.title}</h4>
              <div className={styles.cardCat} style={{ color: '#FF8533' }}>
                {cardData.badge}
              </div>
            </div>
          </div>
        </div>

        <p className={styles.cardDesc}>{cardData.desc}</p>

        <div className={styles.cardFooter} style={{ justifyContent: 'flex-start', gap: 8 }}>
          {cardData.route && (
            <Link
              href={cardData.route}
              onClick={() => onNavigate && onNavigate(cardData.route)}
              className={styles.btnPrimary}
            >
              <span>{cardData.ctaText || 'Open Now'}</span>
              <ArrowRight size={13} />
            </Link>
          )}

          {cardData.whatsappUrl && (
            <a
              href={cardData.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnGreen}
            >
              <MessageSquare size={13} />
              <span>WhatsApp Prakash</span>
            </a>
          )}

          {cardData.email && (
            <a href={`mailto:${cardData.email}`} className={styles.btnSecondary}>
              <Mail size={13} />
              <span>Email</span>
            </a>
          )}
        </div>
      </div>
    )
  }

  return null
}
