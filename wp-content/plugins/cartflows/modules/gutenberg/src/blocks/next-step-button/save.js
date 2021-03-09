/**
 * BLOCK: Test Block - Save Block
 */

import classnames from "classnames"
import renderSVG from "../../../dist/blocks/controls/render-icon"

const {
	RichText
} = wp.blockEditor

export default function save( props ) {
	
	const {
        block_id,
        nextStepButtonTitle,
		nextStepButtonSubTitle,
		icon,
		iconPosition,
	} = props.attributes

	let icon_html = ''
	if ( "" != icon ) {
		icon_html = (
			<div className="wpcf__next-step-button-icon">{renderSVG(icon)}</div>
		)	
	}

	return (
		<div
			className={ classnames(
				props.className,
				`cf-block-${block_id}`,					
			) }
		>
			<div className="wpcf__next-step-button">
				<div className="wpcf__next-step-button-wrap">
					<a href="?class=wcf-next-step" className="wpcf__next-step-button-link">
					{ iconPosition === "before_title_sub_title" && icon_html }
						<span className="wpcf__next-step-button-content-wrap">
							<div className="wpcf__next-step-button-title-wrap">
								{ iconPosition === "before_title" && icon_html }
									<RichText.Content
										value={ nextStepButtonTitle }
										tagName='span'
										className='wpcf__next-step-button-title'
									/>
								{ iconPosition === "after_title" && icon_html }
							</div>
                            { nextStepButtonSubTitle &&
								<RichText.Content
									value={ nextStepButtonSubTitle }
									tagName='div'
									className='wpcf__next-step-button-sub-title'
								/>
                            }
						</span>
						{ iconPosition === "after_title_sub_title" && icon_html }
					</a>
				</div>
			</div>
		</div>
	)
}
