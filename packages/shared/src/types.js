// Shared TypeScript-style JSDoc types for the monorepo

/**
 * @typedef {Object} Lead
 * @property {string} id
 * @property {string} company
 * @property {string} website
 * @property {string} description
 * @property {string} industry
 * @property {string} contact
 */

/**
 * @typedef {Object} Email
 * @property {string} id
 * @property {string} leadId
 * @property {string} type - 'cold_outreach' | 'follow_up' | 'value_add'
 * @property {string} subject
 * @property {string} body
 * @property {Date} createdAt
 */

/**
 * @typedef {Object} SearchConfig
 * @property {string} query
 * @property {number} numResults
 * @property {string[]} filters
 * @property {Object} options
 */

export const EmailTypes = {
  COLD_OUTREACH: 'cold_outreach',
  FOLLOW_UP: 'follow_up',
  VALUE_ADD: 'value_add'
};
