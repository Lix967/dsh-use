/**
 * dsh-use — a minimal DeepSeek Harness plugin.
 *
 * A dsh plugin is an ordinary Cordis plugin: this module exports `name`, an
 * optional `inject` list of required services, and `apply(ctx)`.
 *
 * This starter does exactly one harmless thing: it registers one extra system
 * prompt section, which is enough to prove the whole chain works end to end
 * (repo -> `dsh plugin add` -> profile bundle -> a live session).
 * Replace the body of `apply` with whatever the plugin should actually do.
 */

/** Stable plugin name shown in logs and diagnostics. */
export const name = 'dsh-use'

/** No hard service requirements: the starter degrades instead of failing. */
export const inject = []

/**
 * Mount the plugin.
 * @param ctx - Cordis context of the profile that loaded this row.
 */
export function apply(ctx) {
  const say = (message) => {
    try {
      ctx.logger?.info?.(message)
    } catch {
      /* logging is best-effort: never let it break a boot */
    }
  }

  say('dsh-use: plugin loaded')

  try {
    ctx.inject(['systemPrompt'], (promptCtx) => {
      promptCtx.systemPrompt?.section?.({
        name: 'plugin:dsh-use',
        order: 0,
        text: () => 'The dsh-use plugin is active.'
      })
      say('dsh-use: system prompt section registered')
    })
  } catch (error) {
    say('dsh-use: system prompt section unavailable: ' + (error?.message ?? String(error)))
  }
}
