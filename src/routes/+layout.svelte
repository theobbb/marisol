<script>
	import './styles.css';
	import NProgress from 'nprogress';

	import './style-progress.css';
	import { navigating } from '$app/stores';
	import { progress } from '$lib/store';

	$progress = NProgress.configure({
		// Full list: https://github.com/rstacruz/nprogress#configuration
		minimum: 0.16,
		easing: 'ease',
		template: '<div class="bar" role="bar"><div class="peg"></div></div>',
	});

	$: {
		if ($navigating) {
			NProgress.start();
		}
		if (!$navigating) {
			NProgress.done();
		}
	}
</script>

<div class="font-light tracking-[0.01rem] text-stone-700"><slot /></div>
